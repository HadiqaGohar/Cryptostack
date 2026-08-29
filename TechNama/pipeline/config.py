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
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
LOGS_DIR = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)
