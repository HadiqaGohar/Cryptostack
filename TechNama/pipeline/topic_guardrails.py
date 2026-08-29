"""
Content Scope Guardrails - Strict topic filtering for TechNama
ONLY these categories allowed:
- IT News / Technology
- AI / Cloud Computing
- Cybersecurity
- Startups & Entrepreneurship
- Tech Reviews / Gadgets
Pakistan-first focus. Global only if directly Pakistan-relevant or major tech companies.
"""

ALLOWED_TOPICS = [
    'technology', 'tech', 'it', 'software', 'hardware', 'computer', 'digital',
    'artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning',
    'cloud', 'cloud computing', 'aws', 'azure', 'google cloud',
    'cybersecurity', 'cyber', 'security', 'hack', 'hacking', 'vulnerability',
    'startup', 'startup', 'entrepreneur', 'funding', 'venture', 'investment',
    'review', 'gadget', 'smartphone', 'laptop', 'device', 'product',
    'pakistan', 'pakistani', 'karachi', 'lahore', 'islamabad', 'rawalpindi',
    'faisalabad', 'peshawar', 'quetta', 'multan',
]

BLOCKED_TOPICS = [
    'entertainment', 'bollywood', 'hollywood', 'movie', 'film', 'celebrity',
    'politics', 'political', 'election', 'government', 'minister',
    'health', 'medical', 'hospital', 'disease', 'covid',
    'crime', 'murder', 'robbery', 'arrest', 'police',
    'sports', 'cricket', 'football', 'match', 'tournament',
    'religion', 'religious', 'temple', 'mosque',
    'gossip', 'rumor', 'scandal',
]

BLOCKED_DOMAINS = [
    'dawn.com/entertainment',
    'geo.tv/entertainment',
    'ARY/news/entertainment',
    'bbc.com/sport',
    'espn.com',
]

def is_topic_allowed(title: str, description: str = '', source_url: str = '') -> tuple[bool, str]:
    text = f"{title} {description}".lower()
    for blocked in BLOCKED_TOPICS:
        if blocked in text:
            return False, f"Blocked: contains '{blocked}'"
    for domain in BLOCKED_DOMAINS:
        if domain in source_url.lower():
            return False, f"Blocked: source domain '{domain}'"
    for allowed in ALLOWED_TOPICS:
        if allowed in text:
            return True, f"Matched: '{allowed}'"
    if any(kw in text for kw in ['pakistan', 'pakistani', 'karachi', 'lahore', 'islamabad']):
        return True, "Pakistan-related"
    if any(kw in text for kw in ['apple', 'google', 'microsoft', 'meta', 'amazon', 'openai', 'nvidia']):
        return True, "Major tech company"
    return False, "No matching topic found"
