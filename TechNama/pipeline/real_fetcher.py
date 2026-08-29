"""
Real Content Fetcher - Fetches actual articles with their real images
Uses direct RSS feeds from tech publications + image extraction
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

# Direct RSS feeds that give real article URLs and often include images
DIRECT_RSS_FEEDS = {
    'tech': [
        ('TechCrunch', 'https://techcrunch.com/feed/'),
        ('The Verge', 'https://www.theverge.com/rss/index.xml'),
        ('Ars Technica', 'https://feeds.arstechnica.com/arstechnica/index'),
        ('Engadget', 'https://www.engadget.com/rss.xml'),
        ('Wired', 'https://www.wired.com/feed/rss'),
    ],
    'ai': [
        ('TechCrunch AI', 'https://techcrunch.com/category/artificial-intelligence/feed/'),
        ('The Verge AI', 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'),
        ('MIT Tech Review AI', 'https://www.technologyreview.com/feed/'),
    ],
    'cyber': [
        ('Krebs on Security', 'https://krebsonsecurity.com/feed/'),
        ('The Hacker News', 'https://feeds.feedburner.com/TheHackersNews'),
        ('BleepingComputer', 'https://www.bleepingcomputer.com/feed/'),
    ],
    'startups': [
        ('TechCrunch Startups', 'https://techcrunch.com/category/startups/feed/'),
        ('Crunchbase News', 'https://news.crunchbase.com/feed/'),
    ],
    'reviews': [
        ('The Verge Reviews', 'https://www.theverge.com/rss/reviews/index.xml'),
        ('Wired Reviews', 'https://www.wired.com/feed/tag/reviews/latest/rss'),
        ('Engadget Reviews', 'https://www.engadget.com/rss.xml'),
    ],
}

# Google News RSS as fallback (gives titles + descriptions but no direct URLs)
GOOGLE_NEWS_RSS = {
    'tech': 'https://news.google.com/rss/search?q=technology+news+pakistan&hl=en-PK&gl=PK&ceid=PK:en',
    'ai': 'https://news.google.com/rss/search?q=artificial+intelligence+cloud+computing&hl=en-PK&gl=PK&ceid=PK:en',
    'cyber': 'https://news.google.com/rss/search?q=cybersecurity+hacking+security&hl=en-PK&gl=PK&ceid=PK:en',
    'startups': 'https://news.google.com/rss/search?q=startup+funding+entrepreneurship&hl=en-PK&gl=PK&ceid=PK:en',
    'reviews': 'https://news.google.com/rss/search?q=tech+review+gadget+smartphone+laptop&hl=en-PK&gl=PK&ceid=PK:en',
}


def extract_image_from_entry(entry):
    """Extract image URL from an RSS feed entry"""
    # 1. Check media_content
    for media in entry.get('media_content', []):
        url = media.get('url', '')
        if url and ('image' in media.get('type', '') or url.endswith(('.jpg', '.jpeg', '.png', '.webp'))):
            return url

    # 2. Check media_thumbnail
    for thumb in entry.get('media_thumbnail', []):
        url = thumb.get('url', '')
        if url:
            return url

    # 3. Check enclosures
    for enc in entry.get('enclosures', []):
        href = enc.get('href', '')
        if href and ('image' in enc.get('type', '') or href.endswith(('.jpg', '.jpeg', '.png', '.webp'))):
            return href

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
    """Fetch an article page and extract its main image"""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10, allow_redirects=True)
        if resp.status_code != 200:
            return None

        html = resp.text

        # Try og:image first (most reliable)
        og_match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if og_match:
            return og_match.group(1)

        # Try twitter:image
        tw_match = re.search(r'<meta[^>]*name=["\']twitter:image["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if tw_match:
            return tw_match.group(1)

        # Try twitter:image:src
        tw2_match = re.search(r'<meta[^>]*name=["\']twitter:image:src["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if tw2_match:
            return tw2_match.group(1)

        # Try first article/hero image
        img_match = re.search(r'<img[^>]*src=["\']([^"\']+\.(jpg|jpeg|png|webp))["\']', html, re.IGNORECASE)
        if img_match:
            img_url = img_match.group(1)
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            elif img_url.startswith('/'):
                parsed = urlparse(url)
                img_url = f"{parsed.scheme}://{parsed.netloc}{img_url}"
            return img_url

        return None
    except Exception as e:
        print(f"  [Image Extract Error] {e}")
        return None


def download_image(url, filename):
    """Download an image and save it locally"""
    try:
        if not url or not filename:
            return None

        # Normalize URL
        if url.startswith('//'):
            url = 'https:' + url

        resp = requests.get(url, headers=HEADERS, timeout=15, stream=True)
        if resp.status_code != 200:
            return None

        content_type = resp.headers.get('content-type', '')
        if 'image' not in content_type and not any(url.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
            return None

        images_dir = os.path.join(DATA_DIR, 'images')
        os.makedirs(images_dir, exist_ok=True)
        filepath = os.path.join(images_dir, filename)

        with open(filepath, 'wb') as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)

        size = os.path.getsize(filepath)
        if size > 5000:  # At least 5KB to be a real image
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
    """Fallback: fetch from Google News RSS (titles/descriptions only, no images)"""
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

        article_hash = hashlib.md5(f"{title}{link}".encode()).hexdigest()

        article = {
            'title': title,
            'url': link,
            'description': description,
            'pub_date': pub_date,
            'source': source,
            'category': category,
            'image_url': None,  # Google News RSS doesn't provide images
            'hash': article_hash,
            'has_real_image': False,
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
