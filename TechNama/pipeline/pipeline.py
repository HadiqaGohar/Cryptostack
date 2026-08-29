"""
Main News Pipeline - Orchestrates fetching, rewriting, filtering, and posting
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from datetime import datetime
from real_fetcher import fetch_all_real
from topic_guardrails import is_topic_allowed
from groq_rewriter import rewrite_article
from wordpress_poster import post_via_mysql, get_or_create_category, upload_featured_image
import json
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(os.path.dirname(__file__), 'logs', f'pipeline_{datetime.now().strftime("%Y%m%d")}.log')),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

CATEGORY_MAP = {
    'tech': ('IT News', 'it-news'),
    'ai': ('AI & Cloud', 'ai-cloud'),
    'cyber': ('Cybersecurity', 'cybersecurity'),
    'startups': ('Startups', 'startups'),
    'reviews': ('Tech Reviews', 'tech-reviews'),
}

def run_pipeline():
    logger.info("=" * 60)
    logger.info(f"PIPELINE RUN: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    logger.info("=" * 60)
    
    articles = fetch_all_real()
    logger.info(f"Fetched {len(articles)} raw articles")
    
    with_img = sum(1 for a in articles if a.get('has_real_image'))
    logger.info(f"Articles with real images: {with_img}/{len(articles)}")
    
    filtered = []
    rejected = []
    for a in articles:
        allowed, reason = is_topic_allowed(a['title'], a['description'], a['url'])
        if allowed:
            filtered.append(a)
        else:
            rejected.append({'title': a['title'], 'reason': reason})
    
    logger.info(f"After filtering: {len(filtered)} allowed, {len(rejected)} rejected")
    
    posted = 0
    failed = 0
    draft = 0
    max_articles = 10
    
    for article in filtered[:max_articles]:
        logger.info(f"Processing: {article['title'][:60]}...")
        
        rewritten = rewrite_article(
            article['title'],
            article['description'],
            article['source'],
            article['url']
        )
        
        source_citation = f'\n\n<p><em>Source: <a href="{article["url"]}" target="_blank" rel="noopener">{article["source"]}</a></em></p>'
        
        category_name, category_slug = CATEGORY_MAP.get(article['category'], ('IT News', 'it-news'))
        cat_id = get_or_create_category(category_name, category_slug)
        
        # Upload the real image as WordPress media attachment
        featured_image_id = None
        if article.get('local_image_path'):
            featured_image_id = upload_featured_image(
                article['local_image_path'],
                article['title']
            )
            if featured_image_id:
                logger.info(f"  -> Uploaded image (ID: {featured_image_id})")
            else:
                logger.warning(f"  -> Image upload failed, using no featured image")
        
        full_content = rewritten['body'] + source_citation
        
        needs_review = 'error' in rewritten.get('status', '') or rewritten['status'] == 'no_api_key'
        post_status = 'draft' if needs_review else 'publish'
        
        result = post_via_mysql(
            title=rewritten['headline'],
            content=full_content,
            status=post_status,
            category_ids=[cat_id] if cat_id else None,
            featured_image_id=featured_image_id
        )
        
        if result['id'] > 0:
            if post_status == 'draft':
                draft += 1
                logger.info(f"  -> DRAFT created (ID: {result['id']}) - needs review")
            else:
                posted += 1
                logger.info(f"  -> PUBLISHED (ID: {result['id']})")
        else:
            failed += 1
            logger.error(f"  -> FAILED: {result['status']}")
    
    logger.info("=" * 60)
    logger.info(f"PIPELINE COMPLETE: {posted} published, {draft} drafts, {failed} failed")
    logger.info("=" * 60)
    
    return {
        'total_fetched': len(articles),
        'filtered': len(filtered),
        'rejected': len(rejected),
        'published': posted,
        'drafts': draft,
        'failed': failed
    }

if __name__ == '__main__':
    result = run_pipeline()
    print(json.dumps(result, indent=2))
