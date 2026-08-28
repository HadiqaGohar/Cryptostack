# TechNama - Rollback Procedure

## Overview

This document provides step-by-step instructions for rolling back the TechNama portal to a previous state in case of critical issues.

---

## Rollback Scenarios

### Scenario 1: Code Rollback (Minor Issues)

**When to use:** Bug introduced in latest code changes, theme issues, plugin conflicts.

**Time required:** 5 minutes

```bash
# Step 1: Navigate to project directory
cd /root/hadiqa/gohar

# Step 2: Check current commit
git log --oneline -3

# Step 3: Revert to previous commit
git revert HEAD

# Step 4: Push changes
git push origin master

# Step 5: Clear cache
docker exec -u www-data technama-wordpress wp cache flush --allow-root

# Step 6: Verify site is working
curl -sI https://technama.16.jugaar.ai 2>&1 | head -1
```

---

### Scenario 2: Database Rollback (Data Issues)

**When to use:** Corrupted data, accidental deletions, content issues.

**Time required:** 15 minutes

```bash
# Step 1: List available backups
ls -la /var/www/html/backups/

# Step 2: Stop WordPress (optional, prevents data changes)
docker stop technama-wordpress

# Step 3: Restore database
docker start technama-wordpress
docker exec -u www-data technama-wordpress wp db import /var/www/html/backups/pre-launch-YYYYMMDD.sql --allow-root

# Step 4: Clear cache
docker exec -u www-data technama-wordpress wp cache flush --allow-root

# Step 5: Verify database
docker exec -u www-data technama-wordpress wp post list --post_status=publish --format=count --allow-root

# Step 6: Verify site
curl -sI https://technama.16.jugaar.ai 2>&1 | head -1
```

---

### Scenario 3: Full Rollback (Critical Issues)

**When to use:** Site completely broken, security breach, major data loss.

**Time required:** 30 minutes

```bash
# Step 1: Create emergency backup
docker exec -u www-data technama-wordpress wp db export /var/www/html/backups/emergency-$(date +%Y%m%d%H%M).sql --allow-root
tar -czf /var/www/html/backups/emergency-theme-$(date +%Y%m%d%H%M).tar.gz /var/www/html/wp-content/themes/technama/

# Step 2: Stop services
docker stop technama-wordpress

# Step 3: Restore database
docker start technama-wordpress
docker exec -u www-data technama-wordpress wp db import /var/www/html/backups/pre-launch-YYYYMMDD.sql --allow-root

# Step 4: Restore theme
tar -xzf /var/www/html/backups/theme-backup-YYYYMMDD.tar.gz -C /var/www/html/wp-content/themes/

# Step 5: Clear all caches
docker exec -u www-data technama-wordpress wp cache flush --allow-root
docker exec pilotron-nginx nginx -s reload

# Step 6: Verify everything
curl -sI https://technama.16.jugaar.ai 2>&1 | head -1
curl -s https://technama.16.jugaar.ai 2>&1 | grep -c "TechNama"
```

---

### Scenario 4: Emergency (Site Down)

**When to use:** Complete outage, server failure.

**Time required:** Varies

```bash
# Step 1: Check container status
docker ps -a | grep technama

# Step 2: Check logs
docker logs technama-wordpress --tail 50
docker logs technama-mysql --tail 50
docker logs pilotron-nginx --tail 50

# Step 3: Restart containers
docker restart technama-mysql
docker restart technama-wordpress
docker restart pilotron-nginx

# Step 4: If containers won't start
docker-compose -f /root/hadiqa/gohar/TecNama/docker-compose.yml down
docker-compose -f /root/hadiqa/gohar/TecNama/docker-compose.yml up -d

# Step 5: Contact hosting support if issue persists
```

---

## Backup Schedule

| Backup Type | Frequency | Retention | Location |
|-------------|-----------|-----------|----------|
| Database | Daily | 14 days | /var/www/html/backups/ |
| Theme files | Weekly | 4 weeks | /var/www/html/backups/ |
| Full site | Monthly | 3 months | /var/www/html/backups/ |
| UpdraftPlus | Daily | 14 days | Cloud storage |

---

## Emergency Contacts

| Role | Contact | When to Call |
|------|---------|--------------|
| Project Manager | [Phone] | Any critical issue |
| Lead Developer | [Phone] | Server/code emergency |
| Security Lead | [Phone] | Security incident |
| Hosting Support | [Phone] | Infrastructure issue |

---

## Post-Rollback Checklist

- [ ] Site loads correctly
- [ ] All pages return HTTP 200
- [ ] Login works (/secure-login)
- [ ] Search works
- [ ] Video embeds play
- [ ] Forms submit correctly
- [ ] No mixed content warnings
- [ ] Security headers present
- [ ] Analytics tracking works
