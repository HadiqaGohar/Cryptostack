# TechNama - Technology News & Startup Portal

Pakistan's premier technology news and startup media portal.

## 🌐 Live Site
- **URL:** https://technama.16.jugaar.ai
- **Admin:** https://technama.16.jugaar.ai/secure-login

## 📋 Overview
TechNama is a complete technology news portal featuring:
- Real-time tech news coverage
- Startup founder interviews and live shows
- Product reviews and deals
- Press release distribution
- Sponsor/advertising management

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| CMS | WordPress 7.1 (PHP 8.1) |
| Database | MySQL 8.0.46 |
| Server | Nginx 1.31.2 (Docker) |
| Theme | Custom (GeneratePress child) |
| Security | Wordfence, WPS Hide Login, SSL |
| SEO | Yoast SEO |
| Backup | UpdraftPlus (daily) |
| CDN | Cloudflare |

## 📁 Project Structure

```
TechNama/
├── docker-compose.yml      # Docker stack (WordPress + MySQL)
├── .env                     # Environment variables (not in git)
├── docs/                    # Documentation
│   ├── backup-restore.md    # Backup procedures
│   ├── cdn-setup.md         # Cloudflare CDN setup
│   ├── database-schema.md   # Database structure
│   ├── security-audit.md    # Security audit report
│   ├── update-procedure.md  # CMS update process
│   ├── team-structure.md    # Team roles & responsibilities
│   ├── workflows.md         # Editorial & production workflows
│   ├── raci-matrix.md       # Responsibility assignment
│   ├── onboarding.md        # New team member guide
│   └── communication.md     # Communication protocols
├── nginx/
│   └── technama.conf        # Nginx reverse proxy config
└── theme/technama/          # WordPress theme
    ├── style.css            # Complete CSS (1499 lines)
    ├── functions.php        # Core functions (1517 lines)
    ├── header.php           # Header template
    ├── footer.php           # Footer template
    ├── single.php           # Single post
    ├── single-video_review.php  # Episode page
    ├── index.php            # Main template
    ├── archive.php          # Archive template
    ├── search.php           # Search results
    ├── sidebar.php          # Sidebar
    ├── comments.php         # Comments
    ├── 404.php              # 404 page
    ├── inc/                 # Theme includes
    │   ├── customizer.php   # Theme customizer
    │   ├── custom-post-types.php  # CPTs & taxonomies
    │   ├── enqueue.php      # Asset loading
    │   └── template-tags.php # Template helpers
    ├── assets/              # Static assets
    │   ├── css/editor-style.css  # Gutenberg styles
    │   ├── images/          # Theme images
    │   └── js/              # JavaScript files
    ├── page-templates/      # 8 page templates
    └── template-parts/      # 8 template parts
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | This file |
| [docs/backup-restore.md](TechNama/docs/backup-restore.md) | Backup & restoration procedures |
| [docs/cdn-setup.md](TechNama/docs/cdn-setup.md) | Cloudflare CDN configuration |
| [docs/database-schema.md](TechNama/docs/database-schema.md) | Database structure & custom tables |
| [docs/security-audit.md](TechNama/docs/security-audit.md) | Security audit report |
| [docs/update-procedure.md](TechNama/docs/update-procedure.md) | CMS update process |
| [docs/team-structure.md](TechNama/docs/team-structure.md) | Team roles & responsibilities |
| [docs/workflows.md](TechNama/docs/workflows.md) | Editorial & production workflows |
| [docs/raci-matrix.md](TechNama/docs/raci-matrix.md) | Responsibility assignment matrix |
| [docs/onboarding.md](TechNama/docs/onboarding.md) | New team member guide |
| [docs/communication.md](TechNama/docs/communication.md) | Communication protocols |

## 🚀 Quick Start

### For Developers
```bash
# Clone repository
git clone /root/hadiqa/gohar/

# Navigate to project
cd gohar/TechNama

# Copy environment file
cp .env.example .env

# Start Docker environment
docker-compose up -d

# Access site
open http://localhost:8080

# Access admin
open http://localhost:8080/secure-login
```

### For Content Team
1. Login to WordPress admin
2. Go to Posts → Add New
3. Write your article
4. Add featured image (400x250)
5. Set categories and tags
6. Check Yoast SEO score
7. Submit for review

## 📊 Phase Completion Status

| Phase | Description | Status | Commit |
|-------|-------------|--------|--------|
| Phase 1 | Discovery & Infrastructure | ✅ | `ec3cbfc` |
| Phase 2 | UI/UX & CMS | ✅ | `4eaf744` |
| Phase 3 | Features & Integrations | ✅ | `ec3cbfc` |
| Phase 4 | SEO, Security & Analytics | ✅ | `547c5ab` |
| Phase 5 | Content & Live Show Setup | ✅ | `547c5ab` |
| Phase 6 | Functional Requirements | ✅ | `f149286` |
| Phase 7 | Technical Architecture | ✅ | `a7d9e02` |
| Phase 8 | Database/Content Model | ✅ | `6c51074` |
| Phase 9 | Security Requirements | ✅ | `53f1826` |
| Phase 10 | SEO & AdSense Readiness | ✅ | `dee0f1b` |
| Phase 11 | Startup Live Show | ✅ | `c51629d` |
| Phase 12 | QA & Launch | ✅ | `ef95e72` |
| Phase 13 | Team & Documentation | ✅ | In Progress |

## 🔧 Key Features

### Custom Post Types
- **Video Reviews** - Live show episodes
- **Deals** - Product deals
- **Press Releases** - External PR submissions
- **Reviews** - Product reviews

### Custom Taxonomies
- **Tech Topics** - Technology categories
- **Video Categories** - Video classifications
- **Brands** - Product brands

### Security Features
- SSL/HTTPS with HSTS
- 7 security headers
- Rate limiting (3 zones)
- WPS Hide Login
- Wordfence WAF
- XML-RPC disabled
- File editing disabled

### Performance Features
- GZIP compression
- Browser caching (30 days)
- Lazy loading images
- Optimized images (JPEG 82%)
- WP Super Cache

## 📞 Support

For issues or questions:
- **Technical Issues:** Create a GitHub issue
- **Content Questions:** Contact the editorial team
- **Security Issues:** Contact the security lead immediately

## 📄 License

Proprietary - TechNama © 2026

---

*Last updated: August 2026*
