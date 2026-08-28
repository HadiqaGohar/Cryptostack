# TechNama - Recommended Commercial Packages

## Overview

TechNama offers three commercial packages designed to meet different business needs and budgets. Each tier builds upon the previous one, providing additional features and capabilities.

---

## Package Summary

| Package | Positioning | Target Customer |
|---------|-------------|-----------------|
| **Basic** | Launch-ready media portal | Small news sites, blogs, basic startup portals |
| **Professional** | Full startup media platform | Startup media portals, tech news sites, interview platforms |
| **Enterprise** | Scalable media ecosystem | Enterprise media companies, large news portals, multi-author platforms |

---

## BASIC Package — "Launch-Ready Media Portal"

### Positioning
Core WordPress portal with essential features for immediate launch.

### Scope

#### CMS & Content
- WordPress 7.1 (PHP 8.1)
- GeneratePress child theme (31 PHP files)
- 4 Custom Post Types (Video Reviews, Deals, Press Releases, Reviews)
- 3 Custom Taxonomies (Tech Topics, Video Categories, Brands)
- 8 Page Templates (Homepage, Live Shows, Startups, etc.)
- 8 Template Parts (Hero, Ticker, Card, Article, Video, etc.)
- 20 published articles, 12 pages (initial content)
- 19 categories, 15 tags

#### Design & Responsiveness
- Responsive design (6 breakpoints: 575px-1200px+)
- Brand colors: Purple #37215F, Blue #0881BE
- Typography: Poppins (headings), Inter (body)
- 4 custom image sizes (Hero, Card, Video, Thumb)
- Mobile-optimized navigation
- News ticker

#### SEO
- Yoast SEO plugin
- Schema markup (Article, WebSite)
- Open Graph tags
- Twitter Cards
- XML sitemap
- Robots.txt
- Clean URL structure (/%category%/%postname%/)
- Canonical URLs

#### Security
- Wordfence WAF
- SSL/HTTPS (Let's Encrypt)
- Basic security headers (X-Frame, HSTS, etc.)
- HTTP to HTTPS redirect

#### Analytics
- Google Analytics 4 integration (configurable)
- Post view tracking

#### Infrastructure
- Docker WordPress + MySQL
- Nginx reverse proxy
- SSL certificate

#### Social
- Social sharing buttons (Twitter, LinkedIn, Facebook, Copy Link)

### Pricing
| Item | Amount |
|------|--------|
| Development | To be quoted |
| Monthly Support | Optional |
| Annual Renewal | To be quoted |

---

## PROFESSIONAL Package — "Full Startup Media Platform"

### Positioning
Full-featured portal with membership, video archive, press-release workflow, sponsor modules, and advanced editorial controls.

### Scope

#### Everything in Basic ✅
All Basic package features included.

#### Membership System
- User registration with custom fields (First Name, Last Name)
- Custom login URL (/secure-login)
- Password policy (12+ chars, complexity)
- User dashboard with bookmarks
- 8 user roles (Admin, Editor, Author, Contributor, Subscriber, SEO Manager, SEO Editor, Guest)
- Content gating system
- Login logging (IP, user agent, timestamp)

#### Newsletter System
- Email subscription with GDPR consent tracking
- Admin management dashboard
- Custom database table (tn_newsletter_subscribers)
- Email validation

#### Live Show Management
- Guest user role with profile fields
- Guest profiles (Title, Company, Bio, Twitter, LinkedIn, Website)
- Episode metadata (Season, Episode, Topic, Date, Time, Status)
- Auto-increment episode numbering
- Upcoming shows calendar
- Show filters (All/Episodes/Upcoming/Live)
- Live show banner with status indicator

#### Press Release Workflow
- Multi-field submission form
- File upload support (multiple attachments)
- Moderation workflow (Pending → Published)
- Email notifications to admin
- REST API protection (editor-only access)
- PII stripping from API responses

#### Sponsor/Advertising System
- 5 ad placements (Homepage Leaderboard, Sidebar, Article Top, Footer, General)
- Admin dashboard with status monitoring
- AdSense integration (auto-ads + in-article slots)
- Ad CSS styling (39 classes)
- Sponsor template parts

#### Video Features
- YouTube embed with oEmbed
- Video player with lazy loading (IntersectionObserver)
- Privacy embeds (youtube-nocookie.com)
- VideoObject schema (SEO)
- YouTube thumbnail generation
- YouTube duration API integration
- Video category taxonomy

#### Social Features
- Per-platform share tracking (Twitter, LinkedIn, Facebook, Copy)
- Share count per episode
- Social share buttons on all content

#### Search Enhancement
- Relevanssi plugin (relevance-based search)
- AJAX live search with suggestions
- Keyboard navigation (Arrow keys, Enter, Escape)
- Search term highlighting

#### Additional Features
- Related posts (by category + tags)
- Trending posts (by views + comments)
- Reading time calculation
- Breadcrumbs navigation
- Gutenberg editor support

### Pricing
| Item | Amount |
|------|--------|
| Development | To be quoted |
| Monthly Support | Optional |
| Annual Renewal | To be quoted |

---

## ENTERPRISE Package — "Scalable Media Ecosystem"

### Positioning
Custom integrations, advanced workflows, stronger performance architecture, dedicated support and further automation.

### Scope

#### Everything in Professional ✅
All Professional package features included.

#### Advanced Security Suite
- 7+ security headers (X-Frame, HSTS, CSP, Permissions-Policy, etc.)
- Rate limiting (3 zones: login, admin, forms)
- XML-RPC blocking (nginx + PHP double block)
- Password policy enforcement
- Security audit admin dashboard
- Failed login tracking (IP, user agent, timestamp)
- REST API PII protection
- File access protection (.env, .git, .htaccess blocked)
- Version removal (WP generator tag)
- Brute force protection (Limit Login Attempts)
- Activity logging (Simple History)

#### Performance Optimization Suite
- GZIP compression (level 6)
- Browser caching (30 days, immutable)
- Lazy loading images (native + IntersectionObserver)
- Image optimization (JPEG 82%)
- Emoji removal (WordPress defaults disabled)
- Script deferral (non-critical JS deferred)
- Font optimization (preconnect, preload)
- Resource preloading (hero image)
- WP Super Cache
- Static asset caching (30 days)

#### Full Documentation Package
- README.md (project overview)
- backup-restore.md (backup procedures)
- cdn-setup.md (Cloudflare CDN setup)
- database-schema.md (6 custom tables)
- security-audit.md (security compliance)
- update-procedure.md (CMS updates)
- team-structure.md (team roles)
- workflows.md (production workflows)
- raci-matrix.md (responsibility matrix)
- onboarding.md (new member guide)
- communication.md (communication protocols)
- qa-acceptance-report.md (12/12 criteria)
- release-notes.md (version notes)
- rollback-procedure.md (4 scenarios)
- launch-checklist.md (pre-launch, launch, post-launch)
- monitoring-dashboard.md (metrics, alerts)
- post-launch-review.md (review templates)
- boq-cost-framework.md (cost framework)

#### QA & Testing
- 18 QA test cases
- 12 acceptance criteria (all PASS)
- Responsive testing (6 breakpoints)
- Cross-browser testing (Chrome, Firefox, Safari, Edge, Mobile)
- Performance testing (Lighthouse, GTmetrix)
- Security testing (headers, rate limits, access)
- Functional testing (all features)

#### Rollback & Recovery
- 4 rollback scenarios (code, database, full, emergency)
- Tested restoration procedures
- Git-based version control
- Backup verification

#### Monitoring & Operations
- Daily/weekly/monthly monitoring checklists
- Alert thresholds (response time, error rate, etc.)
- Post-launch review templates
- Improvement backlog framework

#### Advanced Features
- 65+ custom functions
- 10 AJAX handlers
- 6 custom database tables
- 13 widget areas (including 5 sponsor placements)
- 8 JavaScript files (1,631 lines)
- 4 custom image sizes
- Gutenberg editor integration (custom colors, font sizes, block styles)
- WooCommerce compatibility layer
- Customizer settings (30+ options)

### Pricing
| Item | Amount |
|------|--------|
| Development | To be quoted |
| Monthly Support | Included (90 days) |
| Annual Renewal | To be quoted |

---

## Package Comparison

### Feature Matrix

| Feature | Basic | Professional | Enterprise |
|---------|:-----:|:------------:|:----------:|
| **CMS & Content** | | | |
| WordPress 7.1 | ✅ | ✅ | ✅ |
| Custom Theme | ✅ | ✅ | ✅ |
| 4 Custom Post Types | ✅ | ✅ | ✅ |
| 3 Custom Taxonomies | ✅ | ✅ | ✅ |
| 8 Page Templates | ✅ | ✅ | ✅ |
| 8 Template Parts | ✅ | ✅ | ✅ |
| Initial Content (20 posts) | ✅ | ✅ | ✅ |
| **Design** | | | |
| Responsive (6 breakpoints) | ✅ | ✅ | ✅ |
| Brand Colors & Typography | ✅ | ✅ | ✅ |
| News Ticker | ✅ | ✅ | ✅ |
| Mobile Navigation | ✅ | ✅ | ✅ |
| **SEO** | | | |
| Yoast SEO | ✅ | ✅ | ✅ |
| Schema Markup | ✅ | ✅ | ✅ |
| Open Graph Tags | ✅ | ✅ | ✅ |
| XML Sitemap | ✅ | ✅ | ✅ |
| **Security** | | | |
| Wordfence WAF | ✅ | ✅ | ✅ |
| SSL/HTTPS | ✅ | ✅ | ✅ |
| Basic Security Headers | ✅ | ✅ | ✅ |
| Advanced Security Headers (7+) | ❌ | ❌ | ✅ |
| Rate Limiting | ❌ | ❌ | ✅ |
| XML-RPC Blocking | ❌ | ❌ | ✅ |
| Password Policy | ❌ | ❌ | ✅ |
| Security Audit Dashboard | ❌ | ❌ | ✅ |
| Failed Login Tracking | ❌ | ❌ | ✅ |
| **Analytics** | | | |
| GA4 Integration | ✅ | ✅ | ✅ |
| Post View Tracking | ✅ | ✅ | ✅ |
| **Membership** | | | |
| User Registration | ❌ | ✅ | ✅ |
| Custom Login URL | ❌ | ✅ | ✅ |
| User Dashboard | ❌ | ✅ | ✅ |
| Bookmarks | ❌ | ✅ | ✅ |
| Content Gating | ❌ | ✅ | ✅ |
| 8 User Roles | ❌ | ✅ | ✅ |
| **Newsletter** | | | |
| Email Subscription | ❌ | ✅ | ✅ |
| GDPR Consent | ❌ | ✅ | ✅ |
| Admin Management | ❌ | ✅ | ✅ |
| **Live Shows** | | | |
| Guest Management | ❌ | ✅ | ✅ |
| Episode Metadata | ❌ | ✅ | ✅ |
| Show Calendar | ❌ | ✅ | ✅ |
| Show Filters | ❌ | ✅ | ✅ |
| **Press Releases** | | | |
| Submission Form | ❌ | ✅ | ✅ |
| Moderation Workflow | ❌ | ✅ | ✅ |
| File Upload | ❌ | ✅ | ✅ |
| Email Notifications | ❌ | ✅ | ✅ |
| REST API Protection | ❌ | ✅ | ✅ |
| **Sponsor/Ads** | | | |
| 5 Ad Placements | ❌ | ✅ | ✅ |
| Admin Dashboard | ❌ | ✅ | ✅ |
| AdSense Integration | ❌ | ✅ | ✅ |
| **Video** | | | |
| YouTube Embed | ❌ | ✅ | ✅ |
| Video Player | ❌ | ✅ | ✅ |
| VideoObject Schema | ❌ | ✅ | ✅ |
| **Search** | | | |
| Basic Search | ✅ | ✅ | ✅ |
| Relevanssi Enhanced | ❌ | ✅ | ✅ |
| AJAX Live Search | ❌ | ✅ | ✅ |
| **Social** | | | |
| Share Buttons | ✅ | ✅ | ✅ |
| Share Tracking | ❌ | ✅ | ✅ |
| **Performance** | | | |
| Basic Caching | ✅ | ✅ | ✅ |
| GZIP Compression | ❌ | ❌ | ✅ |
| Browser Caching (30 days) | ❌ | ❌ | ✅ |
| Lazy Loading | ❌ | ❌ | ✅ |
| Image Optimization | ❌ | ❌ | ✅ |
| Script Deferral | ❌ | ❌ | ✅ |
| **Documentation** | | | |
| Basic Docs | ❌ | ❌ | ✅ |
| Full Documentation (17 files) | ❌ | ❌ | ✅ |
| **QA & Testing** | | | |
| Basic Testing | ❌ | ❌ | ✅ |
| 12/12 Acceptance Criteria | ❌ | ❌ | ✅ |
| **Operations** | | | |
| Rollback Procedures | ❌ | ❌ | ✅ |
| Monitoring Framework | ❌ | ❌ | ✅ |
| Post-Launch Support | ❌ | ❌ | ✅ |

---

## Pricing Structure

### Development Costs

| Package | Pricing Basis | Amount |
|---------|---------------|--------|
| Basic | Fixed project | To be quoted |
| Professional | Fixed project | To be quoted |
| Enterprise | Fixed project | To be quoted |

### Ongoing Costs

| Item | Basic | Professional | Enterprise |
|------|-------|--------------|------------|
| Monthly Support | Optional | Optional | Included (90 days) |
| Annual Renewal | To be quoted | To be quoted | To be quoted |
| Hosting | To be quoted | To be quoted | To be quoted |
| Domain | To be quoted | To be quoted | To be quoted |
| Premium Plugins | $0 (free tier) | $0 (free tier) | $0 (free tier) |

### Payment Terms

| Milestone | Percentage | Trigger |
|-----------|------------|---------|
| Project Kickoff | 20% | Contract signing |
| Design Approval | 20% | Wireframes + Visual design approved |
| Development Complete | 30% | All features functional |
| QA/UAT Pass | 20% | 12/12 acceptance criteria met |
| Launch + 30 Days | 10% | Site live + 30 day support |

---

## Assumptions & Exclusions

### Assumptions
- All prices are in USD
- Development is done remotely
- Client provides content (articles, images)
- Client provides domain and hosting
- Standard business hours (9 AM - 6 PM)
- Communication via Slack/Email

### Exclusions (All Packages)
- Domain registration costs
- Hosting/VPS costs
- Premium plugin licenses (if needed)
- Content writing (articles, videos)
- Professional photography
- Video production equipment
- Legal review of terms/privacy pages
- Ongoing maintenance (optional add-on)

---

## Terms & Conditions

| Item | Detail |
|------|--------|
| Validity | 30 days from quote date |
| Warranty | 90 days post-launch |
| Support | Email response within 24 hours |
| Changes | Change requests via formal process |
| Intellectual Property | Full ownership upon payment |
| Confidentiality | NDA required |

---

## Recommended Package Selection

### Choose BASIC if you need:
- Quick launch with minimal budget
- Simple content publishing
- Basic SEO and security
- No membership or video features

### Choose PROFESSIONAL if you need:
- Complete membership system
- Live show management
- Press release workflow
- Sponsor/advertising system
- Enhanced video features
- Newsletter subscription

### Choose ENTERPRISE if you need:
- Production-grade security
- Enterprise performance optimization
- Complete documentation suite
- QA-verified quality
- Rollback and monitoring procedures
- Post-launch support
- Dedicated support team

---

*Document Version: 1.0*
*Last Updated: August 2026*
*Prepared for: TechNama Project*
