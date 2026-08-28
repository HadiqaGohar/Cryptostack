# TechNama - Team Structure & Responsibilities

## Organization Chart

```
                    ┌─────────────────┐
                    │  Project Manager │
                    │   (Coordinator)  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────┴───────┐   ┌───────┴───────┐   ┌───────┴───────┐
│  Design Team  │   │  Dev Team     │   │  Content Team │
│               │   │               │   │               │
│ • UI/UX       │   │ • WP/CMS Dev  │   │ • Editorial   │
│   Designer    │   │ • Backend Dev │   │ • Video/Prod  │
│               │   │ • SEO Spec    │   │               │
│               │   │ • Security Eng│   │               │
│               │   │ • QA Engineer │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
```

## Role Definitions

### 1. Project Manager
**Primary Responsibilities:**
- Planning, coordination, milestones, reporting and risk management
- Sprint planning and backlog grooming
- Stakeholder communication
- Budget and resource allocation
- Timeline management
- Risk identification and mitigation

**Key Deliverables:**
- Project roadmap
- Sprint reports
- Risk register
- Status updates

**Tools:** Jira/Trello, Slack, Google Docs

---

### 2. UI/UX Designer
**Primary Responsibilities:**
- Wireframes, visual design, responsive layouts and usability
- User research and personas
- Design system maintenance
- Prototype creation
- Usability testing

**Key Deliverables:**
- Wireframes (Figma/Sketch)
- Visual designs
- Style guide
- Responsive mockups (4 breakpoints)

**Tools:** Figma, Adobe XD, Canva

---

### 3. WordPress/CMS Developer
**Primary Responsibilities:**
- CMS setup, theme customization, templates and integrations
- Custom post types and taxonomies
- Theme development (functions.php, templates)
- Plugin configuration
- Performance optimization

**Key Deliverables:**
- Custom theme (TechNama)
- 8 page templates
- 8 template parts
- 4 custom post types
- 3 custom taxonomies

**Files Owned:**
- `theme/technama/` (all PHP, CSS, JS)
- `docker-compose.yml`

---

### 4. Backend/Integration Developer
**Primary Responsibilities:**
- Membership, APIs/integrations, workflows and custom functionality
- AJAX handlers
- Database operations
- Third-party integrations
- Custom functionality

**Key Deliverables:**
- Newsletter subscription system
- Bookmark functionality
- Press release submission
- Social share tracking
- Guest management system

**Files Owned:**
- `functions.php` (backend logic)
- Database tables (6 custom tables)

---

### 5. SEO Specialist
**Primary Responsibilities:**
- Technical SEO, metadata, sitemap, schema and indexing foundation
- Keyword research
- Content optimization
- Schema markup
- Performance monitoring

**Key Deliverables:**
- Yoast SEO configuration
- XML sitemap
- Schema.org markup (Article, VideoObject, WebSite)
- Meta descriptions
- OG tags

**Files Owned:**
- `inc/customizer.php` (SEO settings)
- Yoast configuration

---

### 6. Security Engineer
**Primary Responsibilities:**
- Hardening, WAF/security review, access controls and backup validation
- Security headers
- Rate limiting
- Access control
- Backup validation
- Security audits

**Key Deliverables:**
- 7 security headers
- Rate limiting (3 zones)
- WPS Hide Login
- Wordfence WAF
- Backup procedures

**Files Owned:**
- `nginx/technama.conf` (security config)
- `docs/security-audit.md`

---

### 7. Content/Editorial Team
**Primary Responsibilities:**
- News, startup stories, interviews, moderation and publishing
- Content creation
- Editorial calendar
- Content moderation
- Social media management

**Key Deliverables:**
- 20 published articles
- 20 categories
- 15 tags
- Content calendar
- Editorial guidelines

**WordPress Roles:** Editor, Author, Contributor

---

### 8. Video/Production Team
**Primary Responsibilities:**
- Live show planning, recording/streaming and media assets
- Guest coordination
- Show scheduling
- Video editing
- Thumbnail creation

**Key Deliverables:**
- 4 video episodes
- Show calendar
- Guest profiles
- Video metadata
- Social clips

**WordPress Roles:** Guest (custom role)

---

### 9. QA Engineer
**Primary Responsibilities:**
- Functional, browser, mobile, performance and regression testing
- Test case creation
- Bug tracking
- Cross-browser testing
- Performance testing

**Key Deliverables:**
- 18 QA test cases (all passing)
- Bug reports
- Performance reports
- Browser compatibility matrix

**Tools:** Chrome DevTools, Lighthouse, GTmetrix

---

## WordPress User Roles

| Role | Capabilities | Team Member |
|------|-------------|-------------|
| Administrator | Full access | Project Manager, Lead Developer |
| Editor | Edit/publish all posts | Content Manager |
| Author | Edit/publish own posts | Writers |
| Contributor | Write but not publish | Junior Writers |
| Subscriber | Read-only + bookmarks | Audience |
| Guest | Read-only (custom) | Show guests |

---

## Responsibility Matrix (Summary)

| Area | PM | Design | WP Dev | Backend | SEO | Security | Content | Video | QA |
|------|:--:|:------:|:------:|:-------:|:---:|:--------:|:-------:|:-----:|:--:|
| Planning | **R** | C | C | C | C | C | C | C | C |
| Design | A | **R** | C | - | C | - | I | I | - |
| Theme Dev | A | C | **R** | C | C | C | - | - | C |
| Backend | A | - | C | **R** | - | C | - | - | C |
| SEO | A | - | C | - | **R** | - | C | - | - |
| Security | A | - | - | C | - | **R** | - | - | C |
| Content | A | - | - | - | C | - | **R** | C | - |
| Video | A | - | - | - | - | - | C | **R** | - |
| QA | A | - | C | C | C | C | C | C | **R** |

**Legend:** R = Responsible, A = Accountable, C = Consulted, I = Informed
```