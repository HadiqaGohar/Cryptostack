# TechNama Database Schema

## Custom Tables (tn_ prefix)

### 1. tn_newsletter_subscribers
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT UNSIGNED AI PK | Primary key |
| email | VARCHAR(255) UNIQUE | Subscriber email |
| first_name | VARCHAR(100) | First name |
| last_name | VARCHAR(100) | Last name |
| consent | TINYINT(1) DEFAULT 1 | GDPR consent |
| status | ENUM('active','unsubscribed','bounced') | Subscription status |
| subscription_date | DATETIME | When subscribed |
| unsubscribed_date | DATETIME NULL | When unsubscribed |
| ip_address | VARCHAR(45) | Subscriber IP |
| source | VARCHAR(50) DEFAULT 'website' | Subscription source |

### 2. tn_user_bookmarks
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT UNSIGNED AI PK | Primary key |
| user_id | BIGINT UNSIGNED FK→wp_users | WordPress user ID |
| post_id | BIGINT UNSIGNED FK→wp_posts | Bookmarked post ID |
| bookmark_date | DATETIME | When bookmarked |
| notes | TEXT NULL | User notes |

### 3. tn_analytics_pageviews
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT UNSIGNED AI PK | Primary key |
| post_id | BIGINT UNSIGNED DEFAULT 0 | Post ID (0 for pages) |
| page_url | VARCHAR(500) | Full page URL |
| user_id | BIGINT UNSIGNED NULL | Logged-in user ID |
| ip_address | VARCHAR(45) | Visitor IP |
| user_agent | TEXT | Browser user agent |
| referrer | VARCHAR(500) | Referrer URL |
| country | VARCHAR(100) | GeoIP country |
| city | VARCHAR(100) | GeoIP city |
| device_type | ENUM('desktop','mobile','tablet','unknown') | Device category |
| browser | VARCHAR(100) | Browser name |
| view_date | DATE | View date |
| view_time | TIME | View time |
| session_id | VARCHAR(64) | Session identifier |

### 4. tn_press_release_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT UNSIGNED AI PK | Primary key |
| post_id | BIGINT UNSIGNED NULL | Created WP post ID |
| submitter_name | VARCHAR(255) | Submitter full name |
| submitter_email | VARCHAR(255) | Submitter email |
| submitter_phone | VARCHAR(50) | Submitter phone |
| organization | VARCHAR(255) | Organization name |
| title | VARCHAR(500) | Press release title |
| content | LONGTEXT | HTML content |
| attachments | TEXT NULL | JSON file paths |
| review_status | ENUM('pending','approved','rejected','revision') | Review workflow |
| reviewer_id | BIGINT UNSIGNED NULL | WP user reviewing |
| review_notes | TEXT NULL | Reviewer comments |
| submitted_date | DATETIME | Submission timestamp |
| reviewed_date | DATETIME NULL | Review timestamp |

### 5. tn_sponsor_campaigns
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT UNSIGNED AI PK | Primary key |
| sponsor_name | VARCHAR(255) | Sponsor company |
| campaign_name | VARCHAR(255) | Campaign identifier |
| placement | ENUM('homepage_leaderboard','sidebar','article_top','footer') | Ad position |
| banner_url | VARCHAR(500) | Banner image path |
| banner_link | VARCHAR(500) | Click-through URL |
| banner_image_id | BIGINT UNSIGNED NULL | WP media attachment ID |
| start_date | DATE | Campaign start |
| end_date | DATE | Campaign end |
| status | ENUM('active','paused','expired','scheduled') | Campaign status |
| impressions | INT UNSIGNED | Total impressions |
| clicks | INT UNSIGNED | Total clicks |
| priority | INT DEFAULT 1 | Display priority |
| created_date | DATETIME | Creation timestamp |

### 6. tn_show_episodes
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT UNSIGNED AI PK | Primary key |
| post_id | BIGINT UNSIGNED NULL | Linked WP post ID |
| show_title | VARCHAR(255) | Show name |
| episode_number | INT UNSIGNED | Episode number |
| guest_name | VARCHAR(255) | Guest name |
| guest_title | VARCHAR(255) | Guest job title |
| guest_company | VARCHAR(255) | Guest company |
| schedule_date | DATETIME | Air date/time |
| stream_url | VARCHAR(500) | Live stream URL |
| recording_url | VARCHAR(500) | Recording URL |
| youtube_video_id | VARCHAR(20) | YouTube video ID |
| duration | VARCHAR(20) | Episode duration |
| status | ENUM('scheduled','live','recorded','published','cancelled') | Episode status |
| description | TEXT NULL | Episode description |
| created_date | DATETIME | Creation timestamp |

## Custom Taxonomies

### tech_topic
Custom taxonomy for technical topic classification.
- Machine Learning, Cloud Infrastructure, Digital Payments, Data Privacy, Web Development, Mobile Apps, DevOps, Blockchain

### brand
Custom taxonomy for brand/product classification.
- Google, Apple, Microsoft, Bazaar, Tag0, Dell, Amazon AWS, Cloudflare

## Standard WordPress Taxonomies (Post Tags)
- artificial-intelligence, cybersecurity, startups, pakistan, cloud-computing, fintech, edtech, enterprise, reviews, google-cloud, export, government, healthcare, ecommerce, live-show
