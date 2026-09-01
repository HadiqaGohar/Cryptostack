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
    # Additional Pakistan tech keywords
    'ptcl', 'jazz', 'telenor', 'ufone', 'zong', 'mobilink',
    'nayaay', 'easypaisa', 'jazzcash', 'sadapay', 'nayapay',
    'daraz', 'foodpanda', 'airblue', 'bykea', 'finja',
    'sbp', 'state bank', 'secp', 'pta',
    'freelanc', 'export', 'it export', 'bpo', 'outsourc',
    'fintech', 'banking', 'digital bank', 'wallet', 'payment',
    'ecommerce', 'e-commerce', 'online shopping',
    'telecom', 'internet', 'broadband', '5g', '4g', '3g',
    ' fiber', 'optical', 'cable', 'isp',
    'robot', 'autonomous', 'drone', 'iot', 'blockchain', 'crypto',
    'bitcoin', 'ethereum', 'defi', 'web3',
    'startup', 'incubator', 'accelerator', 'vc', 'seed',
]

BLOCKED_TOPICS = [
    # Sports - comprehensive
    'cricket', 'football', 'soccer', 'basketball', 'baseball', 'hockey', 'tennis',
    'golf', 'boxing', 'ufc', 'f1', 'formula', 'motogp', 'nascar', 'nfl', 'nba',
    'premier league', 'champions league', 'world cup', 'olympics', 'tournament',
    'match', 'score', 'goal', 'touchdown', 'innings', 'wicket', 'ashes',
    'batsman', 'bowler', 'stadium', 'arena', 'snooker', 'chelsea', 'barcelona',
    'celtic', 'monaco', 'transfer', 'rookie', 'preseason',
    # Entertainment
    'bollywood', 'hollywood', 'movie', 'film', 'celebrity', 'actor', 'actress',
    'singer', 'musician', 'album', 'concert', 'award show', 'emmy', 'oscar',
    'bigg boss', 'reality show', 'tv show', 'netflix', 'disney', 'witcher',
    'celine dion', 'dolly parton', 'buffy', 'angel', 'comic',
    # Lifestyle
    'interior design', 'kitchen design', 'home decor', 'fashion', 'beauty',
    'recipe', 'food', 'restaurant', 'travel', 'vacation', 'hotel', 'flight',
    'wine', 'winery', 'corvette', 'subaru', 'car', 'automotive',
    # Politics
    'election', 'minister', 'parliament', 'senate', 'congress', 'president',
    'prime minister', 'political', 'campaign', 'vote', 'ballot', 'government',
    # Health
    'health', 'medical', 'hospital', 'doctor', 'disease', 'covid', 'vaccine',
    # Crime
    'crime', 'murder', 'robbery', 'arrest', 'police', 'court', 'prison',
    # Other non-tech
    'weather', 'horoscope', 'astrology', 'pet', 'adoption', 'fire',
    'national park', 'brexit', 'nigeria', 'venezuela', 'iran', 'espionage',
    'planned parenthood', 'lgbtq', 'real estate', 'multifamily',
]

BLOCKED_DOMAINS = [
    'dawn.com/entertainment',
    'geo.tv/entertainment',
    'ARY/news/entertainment',
    'bbc.com/sport',
    'espn.com',
    'dawn.com/sport',
    'geo.tv/sport',
    'arynews.tv/sport',
]

# Always allow articles from these Pakistani tech sources
ALLOWED_DOMAINS = [
    'propakistani.pk',
    'techjuice.pk',
]

def is_topic_allowed(title: str, description: str = '', source_url: str = '') -> tuple[bool, str]:
    text = f"{title} {description}".lower()
    
    # Always allow articles from known Pakistani tech sources
    url_lower = source_url.lower()
    for domain in ALLOWED_DOMAINS:
        if domain in url_lower:
            return True, f"Pakistani tech source: {domain}"
    
    # Check blocked topics
    for blocked in BLOCKED_TOPICS:
        if blocked in text:
            return False, f"Blocked: contains '{blocked}'"
    
    # Check blocked domains
    for domain in BLOCKED_DOMAINS:
        if domain in url_lower:
            return False, f"Blocked: source domain '{domain}'"
    
    # Check allowed topics
    for allowed in ALLOWED_TOPICS:
        if allowed in text:
            return True, f"Matched: '{allowed}'"
    
    # Pakistan-related content
    if any(kw in text for kw in ['pakistan', 'pakistani', 'karachi', 'lahore', 'islamabad', 'faisalabad', 'peshawar']):
        return True, "Pakistan-related"
    
    # Major tech company
    if any(kw in text for kw in ['apple', 'google', 'microsoft', 'meta', 'amazon', 'openai', 'nvidia', 'huawei', 'samsung', 'xiaomi']):
        return True, "Major tech company"
    
    return False, "No matching topic found"
