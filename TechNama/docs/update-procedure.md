# TechNama - CMS Update Procedure

## Overview
Controlled update process for WordPress core, themes, and plugins.

---

## 1. PRE-UPDATE CHECKLIST

- [ ] Check current versions
- [ ] Review update changelogs
- [ ] Verify backups are current
- [ ] Schedule during low-traffic hours
- [ ] Notify team of maintenance window

---

## 2. BEFORE ANY UPDATE

```bash
# Create backup
docker exec -u www-data technama-wordpress wp db export /tmp/pre-update-$(date +%Y%m%d).sql --allow-root 2>&1
docker cp technama-wordpress:/tmp/pre-update-*.sql /root/hadiqa/gohar/TechNama/backups/

# Document current state
docker exec -u www-data technama-wordpress wp core version --allow-root 2>&1
docker exec -u www-data technama-wordpress wp plugin list --status=active --format=table --allow-root 2>&1
```

---

## 3. WORDPRESS CORE UPDATE

```bash
# Check for updates
docker exec -u www-data technama-wordpress wp core update --dry-run --allow-root 2>&1

# Apply update
docker exec -u www-data technama-wordpress wp core update --allow-root 2>&1

# Update database
docker exec -u www-data technama-wordpress wp core update-db --allow-root 2>&1

# Verify
docker exec -u www-data technama-wordpress wp core version --allow-root 2>&1
```

---

## 4. PLUGIN UPDATE

```bash
# Update specific plugin
docker exec -u www-data technama-wordpress wp plugin update wordfence --allow-root 2>&1

# Update all plugins
docker exec -u www-data technama-wordpress wp plugin update --all --allow-root 2>&1

# Verify
docker exec -u www-data technama-wordpress wp plugin list --status=active --format=table --allow-root 2>&1
```

---

## 5. THEME UPDATE

```bash
# Pull latest from git
cd /root/hadiqa/gohar && git pull origin master

# Copy to container
docker cp /root/hadiqa/gohar/TechNama/theme/technama/ technama-wordpress:/var/www/html/wp-content/themes/technama/
docker exec technama-wordpress chown -R www-data:www-data /var/www/html/wp-content/themes/technama/
```

---

## 6. POST-UPDATE VERIFICATION

```bash
curl -sI https://technama.16.jugaar.ai 2>&1 | head -1
curl -s https://technama.16.jugaar.ai 2>&1 | grep -ic "fatal\|error"
docker logs technama-wordpress --since=5m 2>&1 | grep -i "fatal\|error"
```

Manual checks:
- [ ] Homepage loads
- [ ] Login works
- [ ] Posts display
- [ ] Videos load
- [ ] Search works

---

## 7. ROLLBACK PROCEDURE

```bash
docker cp /root/hadiqa/gohar/TechNama/backups/pre-update.sql technama-wordpress:/tmp/restore.sql
docker exec -u www-data technama-wordpress wp db import /tmp/restore.sql --allow-root 2>&1
docker exec -u www-data technama-wordpress wp cache flush --allow-root 2>&1
curl -sI https://technama.16.jugaar.ai 2>&1 | head -1
```

---

## 8. UPDATE SCHEDULE

| Component | Frequency | Method |
|-----------|-----------|--------|
| WordPress Core | As needed (security) | WP-CLI |
| Plugins | Weekly check | WP-CLI |
| Theme | Monthly | Git + Docker |
| Security patches | Immediately | WP-CLI |

---

## 9. MAINTENANCE MODE

```bash
# Enable
docker exec -u www-data technama-wordpress wp maintenance-mode activate --allow-root 2>&1

# Disable
docker exec -u www-data technama-wordpress wp maintenance-mode deactivate --allow-root 2>&1
```
