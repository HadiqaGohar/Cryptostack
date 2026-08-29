"""
Groq AI Content Rewriter
Rewrites articles in professional tech journalism style
"""
import os
import re
import requests
from config import GROQ_API_KEY, DATA_DIR
import json
from datetime import datetime

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

REWRITE_PROMPT = """You are a professional tech journalist writing for TechNama (technama.16.jugaar.ai), a Pakistan-focused technology news portal.

Rewrite the following news article with these requirements:
1. Professional, clear, concise tech journalism style
2. Keep ALL facts exactly as they are - do NOT change any numbers, names, dates, or technical details
3. Write in English
4. Include source attribution
5. Add relevant Pakistan context where applicable
6. Keep it under 300 words
7. Use proper paragraphs
8. Add a compelling headline
9. Make it SEO-friendly

Output format:
HEADLINE: [Your headline]
BODY: [Your rewritten article body]

Original article:
Title: {title}
Source: {source}
Description: {description}
URL: {url}
"""

def rewrite_article(title, description, source, url):
    if not GROQ_API_KEY or GROQ_API_KEY == 'will-be-set-later':
        return {
            'headline': title,
            'body': description,
            'status': 'no_api_key'
        }
    prompt = REWRITE_PROMPT.format(
        title=title,
        description=description,
        source=source,
        url=url
    )
    headers = {
        'Authorization': f'Bearer {GROQ_API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'model': 'qwen/qwen3.8-27b',
        'messages': [{'role': 'user', 'content': prompt}],
        'temperature': 0.3,
        'max_tokens': 1000,
    }
    try:
        resp = requests.post(GROQ_URL, headers=headers, json=payload, timeout=30)
        resp.raise_for_status()
        result = resp.json()
        content = result['choices'][0]['message']['content']
        headline_match = re.search(r'HEADLINE:\s*(.+)', content)
        body_match = re.search(r'BODY:\s*(.+)', content, re.DOTALL)
        headline = headline_match.group(1).strip() if headline_match else title
        body = body_match.group(1).strip() if body_match else content
        body = re.sub(r'\n{3,}', '\n\n', body)
        return {
            'headline': headline,
            'body': body,
            'status': 'rewritten'
        }
    except Exception as e:
        print(f"[Groq Error] {e}")
        return {
            'headline': title,
            'body': description,
            'status': f'error: {e}'
        }

if __name__ == '__main__':
    test = rewrite_article(
        "Pakistan IT Exports Surge 20%",
        "Pakistan's IT exports have grown by 20% in the last quarter according to SBP data.",
        "Dawn News",
        "https://example.com"
    )
    print(json.dumps(test, indent=2))
