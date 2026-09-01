"""
Real Content Fetcher - Fetches actual Pakistani tech articles with real images
Uses RSS feeds from Pakistani tech publications + image extraction
"""
import feedparser
import requests
import re
import json
import os
import hashlib
import time
from datetime import datetime
from urllib.parse import urlparse, urljoin
from config import DATA_DIR

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Pakistani tech RSS feeds - primary sources with real images
DIRECT_RSS_FEEDS = {
    'tech': [
        ('ProPakistani Tech', 'https://propakistani.pk/category/tech-and-telecom/feed/'),
        ('TechJuice', 'https://www.techjuice.pk/feed/'),
        ('ProPakistani', 'https://propakistani.pk/feed/'),
    ],
    'ai': [
        ('ProPakistani Tech', 'https://propakistani.pk/category/tech-and-telecom/feed/'),
        ('TechJuice', 'https://www.techjuice.pk/feed/'),
    ],
    'cyber': [
        ('ProPakistani Tech', 'https://propakistani.pk/category/tech-and-telecom/feed/'),
        ('TechJuice', 'https://www.techjuice.pk/feed/'),
    ],
    'startups': [
        ('ProPakistani Startups', 'https://propakistani.pk/category/startups/feed/'),
        ('TechJuice', 'https://www.techjuice.pk/feed/'),
    ],
    'reviews': [
        ('ProPakistani Tech', 'https://propakistani.pk/category/tech-and-telecom/feed/'),
        ('TechJuice', 'https://www.techjuice.pk/feed/'),
    ],
}

# Google News RSS for Pakistan tech news (supplementary)
GOOGLE_NEWS_RSS = {
    'tech': 'https://news.google.com/rss/search?q=technology+news+pakistan&hl=en-PK&gl=PK&ceid=PK:en',
    'ai': 'https://news.google.com/rss/search?q=artificial+intelligence+cloud+computing+Pakistan&hl=en-PK&gl=PK&ceid=PK:en',
    'cyber': 'https://news.google.com/rss/search?q=cybersecurity+hacking+security+Pakistan&hl=en-PK&gl=PK&ceid=PK:en',
    'startups': 'https://news.google.com/rss/search?q=tech+startup+funding+entrepreneurship+Pakistan&hl=en-PK&gl=PK&ceid=PK:en',
    'reviews': 'https://news.google.com/rss/search?q=tech+review+gadget+smartphone+laptop+Pakistan&hl=en-PK&gl=PK&ceid=PK:en',
}


def _normalize_image_url(img_url, page_url):
    """Normalize an image URL relative to the page URL.
    Handles protocol-relative (//), root-relative (/), and plain URLs.
    Returns a fully-qualified absolute URL or None if invalid."""
    if not img_url:
        return None
    img_url = img_url.strip()
    if img_url.startswith('//'):
        return 'https:' + img_url
    if img_url.startswith('http://') or img_url.startswith('https://'):
        return img_url
    if img_url.startswith('/'):
        parsed = urlparse(page_url)
        return f"{parsed.scheme}://{parsed.netloc}{img_url}"
    # Relative URL without leading slash
    return urljoin(page_url, img_url)


def _url_has_image_extension(url):
    """Check if a URL (possibly with query params) ends with a known image extension."""
    parsed = urlparse(url)
    path_lower = parsed.path.lower()
    return any(path_lower.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.bmp', '.tiff'])


def extract_image_from_entry(entry):
    """Extract image URL from an RSS feed entry"""
    # 1. Check media_content (used by TechJuice)
    for media in entry.get('media_content', []):
        url = media.get('url', '')
        if url:
            return url

    # 2. Check enclosures (used by ProPakistani)
    for enc in entry.get('enclosures', []):
        href = enc.get('href', '')
        if href and ('image' in enc.get('type', '') or href.endswith(('.jpg', '.jpeg', '.png', '.webp'))):
            return href
        # Some feeds put URL in 'url' attribute instead of 'href'
        url_attr = enc.get('url', '')
        if url_attr and ('image' in enc.get('type', '') or url_attr.endswith(('.jpg', '.jpeg', '.png', '.webp'))):
            return url_attr

    # 3. Check media_thumbnail
    for thumb in entry.get('media_thumbnail', []):
        url = thumb.get('url', '')
        if url:
            return url

    # 4. Check content for embedded images
    for content in entry.get('content', []):
        value = content.get('value', '')
        if value:
            img_match = re.search(r'<img[^>]*src=["\']([^"\']+)["\']', value)
            if img_match:
                return img_match.group(1)

    # 5. Check summary for embedded images
    summary = entry.get('summary', '')
    if summary:
        img_match = re.search(r'<img[^>]*src=["\']([^"\']+)["\']', summary)
        if img_match:
            return img_match.group(1)

    return None


def extract_image_from_url(url):
    """Fetch an article page and extract its main image.
    Normalizes all returned URLs to absolute form."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10, allow_redirects=True)
        if resp.status_code != 200:
            return None

        html = resp.text

        # Try og:image first (most reliable)
        og_match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html, re.IGNORECASE) or re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if og_match:
            return _normalize_image_url(og_match.group(1), url)

        # Try twitter:image
        tw_match = re.search(r'<meta[^>]*name=["\']twitter:image["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if tw_match:
            return _normalize_image_url(tw_match.group(1), url)

        # Try twitter:image:src
        tw2_match = re.search(r'<meta[^>]*name=["\']twitter:image:src["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if tw2_match:
            return _normalize_image_url(tw2_match.group(1), url)

        # Try <link rel="image_src"> (used by some sites)
        link_match = re.search(r'<link[^>]*rel=["\']image_src["\'][^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE) or re.search(r'<link[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']image_src["\']', html, re.IGNORECASE)
        if link_match:
            return _normalize_image_url(link_match.group(1), url)

        # Try itemprop="image" meta tag
        itemprop_match = re.search(r'<meta[^>]*itemprop=["\']image["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE) or re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*itemprop=["\']image["\']', html, re.IGNORECASE)
        if itemprop_match:
            return _normalize_image_url(itemprop_match.group(1), url)

        # Try first article/hero image
        img_match = re.search(r'<img[^>]*src=["\']([^"\']+\.(jpg|jpeg|png|webp|gif))["\']', html, re.IGNORECASE)
        if img_match:
            return _normalize_image_url(img_match.group(1), url)

        return None
    except Exception as e:
        print(f"  [Image Extract Error] {e}")
        return None


def download_image(url, filename):
    # Reject generic thumbnails
    if _is_generic_thumbnail(url):
        return None
    """Download an image and save it locally.
    Handles protocol-relative, root-relative, and query-parameter URLs."""
    try:
        if not url or not filename:
            return None

        # Normalize URL
        if url.startswith('//'):
            url = 'https:' + url

        resp = requests.get(url, headers=HEADERS, timeout=15, stream=True)
        if resp.status_code != 200:
            resp.close()
            return None

        content_type = resp.headers.get('content-type', '')
        # Use urlparse to check the path (ignoring query params) for extension fallback
        if 'image' not in content_type and not _url_has_image_extension(url):
            resp.close()
            return None

        images_dir = os.path.join(DATA_DIR, 'images')
        os.makedirs(images_dir, exist_ok=True)
        filepath = os.path.join(images_dir, filename)

        with open(filepath, 'wb') as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        resp.close()

        size = os.path.getsize(filepath)
        if size > 15000:  # At least 5KB to be a real image
            return filepath
        else:
            os.remove(filepath)
            return None
    except Exception as e:
        print(f"  [Download Error] {e}")
        return None


def fetch_from_direct_rss(category='tech', max_results=5):
    """Fetch articles from direct RSS feeds (real URLs + often images)"""
    feeds = DIRECT_RSS_FEEDS.get(category, DIRECT_RSS_FEEDS['tech'])
    articles = []

    for source_name, feed_url in feeds:
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:max_results]:
                title = entry.get('title', '').strip()
                link = entry.get('link', '')
                description = re.sub(r'<[^>]+>', '', entry.get('summary', ''))[:500]
                pub_date = entry.get('published', '')

                if not title or not link:
                    continue

                # Extract image from the RSS entry itself
                image_url = extract_image_from_entry(entry)

                # If no image in RSS, try fetching the article page
                if not image_url and link:
                    image_url = extract_image_from_url(link)
                    time.sleep(0.3)

                article_hash = hashlib.md5(f"{title}{link}".encode()).hexdigest()

                article = {
                    'title': title,
                    'url': link,
                    'description': description,
                    'pub_date': pub_date,
                    'source': source_name,
                    'category': category,
                    'image_url': image_url,
                    'hash': article_hash,
                    'has_real_image': bool(image_url),
                }
                articles.append(article)
        except Exception as e:
            print(f"  [RSS Error] {source_name}: {e}")
        time.sleep(0.5)

    return articles


def fetch_from_google_news(category='tech', max_results=5):
    """Fallback: fetch from Google News RSS and try to extract images from articles"""
    url = GOOGLE_NEWS_RSS.get(category, GOOGLE_NEWS_RSS['tech'])
    feed = feedparser.parse(url)
    articles = []

    for entry in feed.entries[:max_results]:
        title = entry.get('title', '').strip()
        link = entry.get('link', '')
        description = re.sub(r'<[^>]+>', '', entry.get('summary', ''))[:500]
        pub_date = entry.get('published', '')
        source = entry.get('source', {}).get('title', 'Google News') if hasattr(entry, 'source') else 'Google News'

        if not title:
            continue

        # Try to extract image from the article URL
        image_url = None
        if link:
            image_url = extract_image_from_url(link)
            time.sleep(0.3)

        article_hash = hashlib.md5(f"{title}{link}".encode()).hexdigest()

        article = {
            'title': title,
            'url': link,
            'description': description,
            'pub_date': pub_date,
            'source': source,
            'category': category,
            'image_url': image_url,
            'hash': article_hash,
            'has_real_image': bool(image_url),
        }
        articles.append(article)

    return articles


def load_seen_hashes():
    path = os.path.join(DATA_DIR, 'seen_articles.json')
    if os.path.exists(path):
        with open(path) as f:
            return set(json.load(f))
    return set()


def save_seen_hashes(hashes):
    path = os.path.join(DATA_DIR, 'seen_articles.json')
    with open(path, 'w') as f:
        json.dump(list(hashes)[-5000:], f)


def fetch_all_real(max_per_category=8):
    """Fetch articles from all categories with real images"""
    seen = load_seen_hashes()
    all_articles = []

    for category in DIRECT_RSS_FEEDS:
        print(f"\n=== Fetching {category} (direct RSS) ===")
        articles = fetch_from_direct_rss(category, max_results=3)

        new_count = 0
        for a in articles:
            if a['hash'] not in seen:
                all_articles.append(a)
                seen.add(a['hash'])
                new_count += 1

        print(f"  Got {len(articles)} articles, {new_count} new")

        # If not enough from direct RSS, supplement with Google News
        if new_count < 3:
            print(f"  Supplementing with Google News RSS...")
            gn_articles = fetch_from_google_news(category, max_results=3)
            for a in gn_articles:
                if a['hash'] not in seen:
                    all_articles.append(a)
                    seen.add(a['hash'])
                    new_count += 1

    save_seen_hashes(seen)

    # Download images for articles that have image URLs
    print(f"\n=== Downloading images ===")
    for article in all_articles:
        if article.get('image_url'):
            ext = '.jpg'
            img_url = article['image_url'].lower()
            if '.png' in img_url:
                ext = '.png'
            elif '.webp' in img_url:
                ext = '.webp'
            elif '.gif' in img_url:
                ext = '.gif'

            filename = f"{article['hash']}{ext}"
            local_path = download_image(article['image_url'], filename)
            if local_path:
                article['local_image_path'] = local_path
                print(f"  [OK] {article['title'][:40]}... -> {filename}")
            else:
                article['local_image_path'] = None
                print(f"  [FAIL] {article['title'][:40]}...")
        else:
            article['local_image_path'] = None

    return all_articles


if __name__ == '__main__':
    print(f"[{datetime.now()}] Starting real content fetch...")
    articles = fetch_all_real()
    print(f"\n{'='*60}")
    print(f"Total: {len(articles)} articles")

    with_image = sum(1 for a in articles if a.get('has_real_image'))
    without_image = sum(1 for a in articles if not a.get('has_real_image'))
    downloaded = sum(1 for a in articles if a.get('local_image_path'))

    print(f"With image: {with_image}")
    print(f"Without image: {without_image}")
    print(f"Downloaded: {downloaded}")
    print(f"{'='*60}")

    for a in articles[:10]:
        img_status = "HAS IMAGE" if a.get('has_real_image') else "NO IMAGE"
        dl_status = "DOWNLOADED" if a.get('local_image_path') else "not downloaded"
        print(f"  [{a['category']}] {a['title'][:50]}... ({img_status}, {dl_status})")
        if a.get('image_url'):
            print(f"    Image: {a['image_url'][:80]}")
        if a.get('local_image_path'):
            print(f"    Local: {a['local_image_path']}")


def _is_generic_thumbnail(url):
    """Reject generic/placeholder thumbnails from Google News and other aggregators."""
    if not url:
        return False
    url_lower = url.lower()
    # Google News generic thumbnails
    generic_patterns = [
        'lh3.googleusercontent.com',
        'news.google.com/__i/rss',
        'news.google.com/rss/thumbnails',
        '=s0-w300',
        '=s0-w200',
        '=s0-w100',
        'google.com/images/branding',
        'gstatic.com/images',
        'gnews.com/thumb',
        'ssl.gstatic.com',
    ]
    for pattern in generic_patterns:
        if pattern in url_lower:
            return True
    return False


def _get_image_hashes():
    """Load hashes of previously downloaded images for deduplication."""
    import hashlib
    hashes_file = os.path.join(DATA_DIR, 'seen_images.json')
    if os.path.exists(hashes_file):
        with open(hashes_file) as f:
            return set(json.load(f))
    return set()


def _save_image_hash(img_hash):
    """Save image hash for deduplication."""
    import hashlib
    hashes_file = os.path.join(DATA_DIR, 'seen_images.json')
    existing = _get_image_hashes()
    existing.add(img_hash)
    # Keep last 2000 hashes
    if len(existing) > 2000:
        existing = set(list(existing)[-2000:])
    with open(hashes_file, 'w') as f:
        json.dump(list(existing), f)
