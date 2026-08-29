"""
Google News RSS + NewsAPI fetcher
Fetches tech news from multiple sources
"""
import feedparser
import requests
import json
import time
import hashlib
import re
from datetime import datetime, timedelta
from config import NEWSAPI_KEY, DATA_DIR
import os

GOOGLE_NEWS_RSS = {
    'tech': 'https://news.google.com/rss/search?q=technology+news+pakistan&hl=en-PK&gl=PK&ceid=PK:en',
    'ai': 'https://news.google.com/rss/search?q=artificial+intelligence+cloud+computing&hl=en-PK&gl=PK&ceid=PK:en',
    'cyber': 'https://news.google.com/rss/search?q=cybersecurity+hacking+security&hl=en-PK&gl=PK&ceid=PK:en',
    'startups': 'https://news.google.com/rss/search?q=startup+funding+entrepreneurship&hl=en-PK&gl=PK&ceid=PK:en',
    'reviews': 'https://news.google.com/rss/search?q=tech+review+gadget+smartphone+laptop&hl=en-PK&gl=PK&ceid=PK:en',
}

def fetch_google_news_rss(category='tech', max_results=10):
    url = GOOGLE_NEWS_RSS.get(category, GOOGLE_NEWS_RSS['tech'])
    feed = feedparser.parse(url)
    articles = []
    for entry in feed.entries[:max_results]:
        title = entry.get('title', '').strip()
        link = entry.get('link', '')
        description = entry.get('summary', '')
        pub_date = entry.get('published', '')
        source = entry.get('source', {}).get('title', 'Google News') if hasattr(entry, 'source') else 'Google News'
        article = {
            'title': title,
            'url': link,
            'description': re.sub(r'<[^>]+>', '', description)[:500],
            'pub_date': pub_date,
            'source': source,
            'category': category,
            'hash': hashlib.md5(f"{title}{link}".encode()).hexdigest(),
        }
        articles.append(article)
    return articles

def fetch_newsapi(category='technology', page_size=10):
    if not NEWSAPI_KEY or NEWSAPI_KEY == 'will-be-set-later':
        return []
    query_map = {
        'technology': 'technology OR IT OR software',
        'ai': 'artificial intelligence OR machine learning OR cloud computing',
        'cybersecurity': 'cybersecurity OR hacking OR security vulnerability',
        'startups': 'startup OR funding OR entrepreneurship',
        'reviews': 'tech review OR gadget OR smartphone OR laptop',
    }
    query = query_map.get(category, 'technology')
    params = {
        'q': query,
        'apiKey': NEWSAPI_KEY,
        'language': 'en',
        'sortBy': 'publishedAt',
        'pageSize': page_size,
    }
    try:
        resp = requests.get('https://newsapi.org/v2/everything', params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        articles = []
        for item in data.get('articles', []):
            article = {
                'title': item.get('title', '').strip(),
                'url': item.get('url', ''),
                'description': (item.get('description') or '')[:500],
                'pub_date': item.get('publishedAt', ''),
                'source': item.get('source', {}).get('name', 'NewsAPI'),
                'category': category,
                'hash': hashlib.md5(f"{item.get('title','')}{item.get('url','')}".encode()).hexdigest(),
            }
            articles.append(article)
        return articles
    except Exception as e:
        print(f"[NewsAPI Error] {e}")
        return []

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

def fetch_all_news():
    seen = load_seen_hashes()
    all_articles = []
    for category in GOOGLE_NEWS_RSS:
        articles = fetch_google_news_rss(category, max_results=8)
        for a in articles:
            if a['hash'] not in seen:
                all_articles.append(a)
                seen.add(a['hash'])
        time.sleep(1)
    newsapi_categories = ['technology', 'ai', 'cybersecurity', 'startups', 'reviews']
    for cat in newsapi_categories:
        articles = fetch_newsapi(cat, page_size=5)
        for a in articles:
            if a['hash'] not in seen:
                all_articles.append(a)
                seen.add(a['hash'])
        time.sleep(1)
    save_seen_hashes(seen)
    return all_articles

if __name__ == '__main__':
    articles = fetch_all_news()
    print(f"[{datetime.now()}] Fetched {len(articles)} new articles")
    for a in articles[:5]:
        print(f"  - {a['title']} ({a['source']})")
