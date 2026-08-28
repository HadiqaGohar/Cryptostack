# TechNama - Team Onboarding Guide

## Welcome to TechNama!

This guide will help you get started as a new team member.

---

## Day 1: Access Setup

### 1. WordPress Account
- **URL:** https://technama.16.jugaar.ai/secure-login
- **Request access from:** Project Manager
- **Role assigned based on:** Your team role

### 2. Repository Access
- **Repository:** `/root/hadiqa/gohar/` (Git)
- **Branch:** `master` (main branch)
- **Access:** Request from Lead Developer

### 3. Communication Tools
- **Slack:** #technama-general, #technama-dev, #technama-content
- **Email:** @technama.16.jugaar.ai
- **Project Board:** [Jira/Trello link]

---

## Day 1-2: Documentation Review

### Required Reading
1. [ ] Project README.md
2. [ ] Team Structure (docs/team-structure.md)
3. [ ] Workflows (docs/workflows.md)
4. [ ] RACI Matrix (docs/raci-matrix.md)
5. [ ] Security Audit (docs/security-audit.md)
6. [ ] Backup Procedures (docs/backup-restore.md)

### Codebase Overview
1. [ ] Review `functions.php` (1517 lines)
2. [ ] Review `style.css` (1499 lines)
3. [ ] Review page templates (8 templates)
4. [ ] Review template parts (8 parts)
5. [ ] Review custom post types (4 CPTs)

---

## Day 3-5: Role-Specific Setup

### For Developers
```bash
# Clone repository
git clone /root/hadiqa/gohar/

# Start Docker environment
cd TechNama
docker-compose up -d

# Access local site
http://localhost:8080

# Access admin
http://localhost:8080/secure-login
```

### For Content Team
1. Login to WordPress admin
2. Review existing content (20 articles)
3. Understand editorial workflow
4. Review SEO guidelines (Yoast)
5. Join #technama-content channel

### For Design Team
1. Review Figma design system
2. Review existing CSS (style.css)
3. Understand responsive breakpoints
4. Review brand colors (#37215F, #0881BE)
5. Review typography (Poppins, Inter)

### For QA Team
1. Review test cases (18 tests)
2. Set up testing tools
3. Review browser compatibility
4. Understand performance benchmarks
5. Join #technama-qa channel

---

## Week 1: Integration

### Daily Standups
- **Time:** 9:00 AM
- **Duration:** 15 minutes
- **Format:** What did you do? What will you do? Any blockers?

### Sprint Ceremonies
- **Sprint Planning:** Monday 10:00 AM
- **Sprint Review:** Friday 3:00 PM
- **Retrospective:** Friday 3:30 PM

---

## Key Contacts

| Role | Name | Contact |
|------|------|---------|
| Project Manager | [TBD] | [TBD] |
| Lead Developer | [TBD] | [TBD] |
| Content Manager | [TBD] | [TBD] |
| Security Lead | [TBD] | [TBD] |

---

## Common Tasks

### How to Publish an Article
1. Login to WordPress admin
2. Go to Posts → Add New
3. Write content using block editor
4. Add featured image (400x250)
5. Set categories and tags
6. Write excerpt (150-160 chars)
7. Check Yoast SEO score
8. Save as draft
9. Submit for review

### How to Add a Video Episode
1. Login to WordPress admin
2. Go to Video Reviews → Add New
3. Fill in show details (meta box)
4. Add YouTube video ID
5. Set guest (select from dropdown)
6. Add episode metadata
7. Publish

### How to Fix a Bug
1. Document the bug
2. Create a ticket in project board
3. Assign to appropriate team member
4. Fix in local environment
5. Test thoroughly
6. Submit for code review
7. Deploy to production
8. Verify fix
