"""
YouTube Live Stream Discovery
Finds live and upcoming tech streams from Pakistan-relevant channels
"""
import requests
import json
import os
from datetime import datetime, timedelta
from config import YOUTUBE_API_KEY, DATA_DIR

YOUTUBE_API = "https://www.googleapis.com/youtube/v3"

PAKISTAN_TECH_CHANNELS = [
    'UCBJycsmduvYEL83R_U4JriQ',
    'UClcB-NB7JI5Gz5rO7bVpLjg',
    'UCtGmv1hV0Z7Y1g6vR9dKwRw',
    'UCkIimWZ9gBJRamKF0rmPU8w',
    'UCQfcafvEkg6JlboR0__JvkA',
]

SEARCH_QUERIES = [
    'Pakistan technology news live',
    'Pakistan tech startup live',
    'Pakistan IT industry live',
    'Pakistan cybersecurity live',
    'Pakistan AI live',
    'Pakistan tech review live',
]

def search_live_streams(query, max_results=5):
    if not YOUTUBE_API_KEY:
        return []
    params = {
        'part': 'snippet',
        'q': query,
        'type': 'video',
        'eventType': 'live',
        'maxResults': max_results,
        'key': YOUTUBE_API_KEY,
        'relevanceLanguage': 'en',
        'regionCode': 'PK',
    }
    try:
        resp = requests.get(f"{YOUTUBE_API}/search", params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        streams = []
        for item in data.get('items', []):
            stream = {
                'video_id': item['id']['videoId'],
                'title': item['snippet']['title'],
                'description': item['snippet']['description'][:200],
                'channel': item['snippet']['channelTitle'],
                'channel_id': item['snippet']['channelId'],
                'published_at': item['snippet']['publishedAt'],
                'thumbnail': item['snippet']['thumbnails'].get('high', {}).get('url', ''),
                'url': f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                'embed_url': f"https://www.youtube.com/embed/{item['id']['videoId']}",
            }
            streams.append(stream)
        return streams
    except Exception as e:
        print(f"[YouTube Search Error] {e}")
        return []

def search_recent_tech_videos(max_results=5):
    if not YOUTUBE_API_KEY:
        return []
    three_days_ago = (datetime.utcnow() - timedelta(days=3)).strftime('%Y-%m-%dT%H:%M:%SZ')
    params = {
        'part': 'snippet',
        'q': 'Pakistan technology news',
        'type': 'video',
        'order': 'date',
        'publishedAfter': three_days_ago,
        'maxResults': max_results,
        'key': YOUTUBE_API_KEY,
        'relevanceLanguage': 'en',
        'regionCode': 'PK',
    }
    try:
        resp = requests.get(f"{YOUTUBE_API}/search", params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        videos = []
        for item in data.get('items', []):
            video = {
                'video_id': item['id']['videoId'],
                'title': item['snippet']['title'],
                'description': item['snippet']['description'][:200],
                'channel': item['snippet']['channelTitle'],
                'published_at': item['snippet']['publishedAt'],
                'thumbnail': item['snippet']['thumbnails'].get('high', {}).get('url', ''),
                'url': f"https://www.youtube.com/watch?v={item['id']['videoId']}",
            }
            videos.append(video)
        return videos
    except Exception as e:
        print(f"[YouTube Recent Error] {e}")
        return []

def discover_live_streams():
    all_streams = []
    seen_ids = set()
    for query in SEARCH_QUERIES:
        streams = search_live_streams(query, max_results=3)
        for s in streams:
            if s['video_id'] not in seen_ids:
                all_streams.append(s)
                seen_ids.add(s['video_id'])
    recent = search_recent_tech_videos(max_results=5)
    for v in recent:
        if v['video_id'] not in seen_ids:
            all_streams.append(v)
            seen_ids.add(v['video_id'])
    
    path = os.path.join(DATA_DIR, 'youtube_streams.json')
    with open(path, 'w') as f:
        json.dump({'discovered_at': datetime.now().isoformat(), 'streams': all_streams}, f, indent=2)
    
    return all_streams

if __name__ == '__main__':
    streams = discover_live_streams()
    print(f"Discovered {len(streams)} streams/videos")
    for s in streams[:5]:
        print(f"  [{s.get('channel', 'Unknown')}] {s['title'][:60]}")
