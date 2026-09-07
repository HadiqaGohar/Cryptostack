import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), 'config.env'))

WP_URL = os.getenv('WP_URL', 'https://technama.16.jugaar.ai')
WP_USER = os.getenv('WP_USER', 'admin')
WP_APP_PASSWORD = os.getenv('WP_APP_PASSWORD', '')
MYSQL_HOST = os.getenv('MYSQL_HOST', 'technama-mysql')
MYSQL_USER = os.getenv('MYSQL_USER', 'root')
MYSQL_PASS = os.getenv('MYSQL_PASS', 'REDACTED_MYSQL_PASS')
MYSQL_DB = os.getenv('MYSQL_DB', 'technama_wp')
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY', '')
NEWSAPI_KEY = os.getenv('NEWSAPI_KEY', '')
GROQ_API_KEY = os.getenv('GROQ_API_KEY', '')
BREVO_API_KEY = os.getenv('BREVO_API_KEY', '')
BREVO_LIST_ID = int(os.getenv('BREVO_LIST_ID', '0'))
BREVO_SENDER_EMAIL = os.getenv('BREVO_SENDER_EMAIL', 'newsletter@technama.com')
BREVO_SENDER_NAME = os.getenv('BREVO_SENDER_NAME', 'TechNama')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
LOGS_DIR = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)

# Newsletter Toggle
NEWSLETTER_ENABLED = os.getenv('NEWSLETTER_ENABLED', 'true').lower() == 'true'

# Admin Email Toggle (empty = admin receives emails)
ADMIN_EMAIL_EXCLUDE = os.getenv('ADMIN_EMAIL_EXCLUDE', '').lower().strip()
