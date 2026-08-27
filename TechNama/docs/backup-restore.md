# TechNama - Backup and Restoration Procedures

## Overview
Automated backups managed by UpdraftPlus with daily schedule.

---

## 1. AUTOMATED BACKUP CONFIGURATION

| Setting | Value |
|---------|-------|
| Plugin | UpdraftPlus v1.26.7 |
| Schedule | Daily |
| Retention | 10 backups |
| Database Backup | Enabled |
| Files Backup | Enabled |
| Storage | Local (server) |

Backup Location: /var/www/html/wp-content/updraft/

---

## 2. MANUAL BACKUP PROCEDURE

### Full Backup
```bash
mkdir -p /root/hadiqa/gohar/TechNama/backups/$(date +%Y-%m-%d)
docker exec -u www-data technama-wordpress wp db export /tmp/backup-$(date +%Y%m%d).sql --allow-root 2>&1
docker cp technama-wordpress:/tmp/backup-$(date +%Y%m%d).sql /root/hadiqa/gohar/TechNama/backups/$(date +%Y-%m-%d)/
docker cp technama-wordpress:/var/www/html/wp-content/themes/technama /root/hadiqa/gohar/TechNama/backups/$(date +%Y-%m-%d)/theme
```

### Database-Only Backup
```bash
docker exec -u www-data technama-wordpress wp db export /tmp/db-backup.sql --allow-root 2>&1
docker cp technama-wordpress:/tmp/db-backup.sql ./backups/
```

---

## 3. RESTORATION PROCEDURE

### Full Site Restoration
```bash
docker cp backups/YYYY-MM-DD/backup.sql technama-wordpress:/tmp/restore.sql
docker exec -u www-data technama-wordpress wp db import /tmp/restore.sql --allow-root 2>&1
docker cp backups/YYYY-MM-DD/theme/* technama-wordpress:/var/www/html/wp-content/themes/technama/
docker exec technama-wordpress chown -R www-data:www-data /var/www/html/wp-content/themes/technama/
docker exec -u www-data technama-wordpress wp cache flush --allow-root 2>&1
docker restart technama-wordpress pilotron-nginx
curl -sI https://technama.16.jugaar.ai 2>&1 | head -1
```

### Database-Only Restoration
```bash
docker cp backups/db-backup.sql technama-wordpress:/tmp/restore.sql
docker exec -u www-data technama-wordpress wp db import /tmp/restore.sql --allow-root 2>&1
docker exec -u www-data technama-wordpress wp cache flush --allow-root 2>&1
```

---

## 4. EMERGENCY ROLLBACK
```bash
cd /root/hadiqa/gohar && git checkout HEAD~1 -- TechNama/theme/technama/
docker cp /root/hadiqa/gohar/TechNama/theme/technama/ technama-wordpress:/var/www/html/wp-content/themes/technama/
docker exec technama-wordpress chown -R www-data:www-data /var/www/html/wp-content/themes/technama/
docker exec -u www-data technama-wordpress wp cache flush --allow-root 2>&1
```

---

## 5. DOCKER VOLUME BACKUP
```bash
# MySQL volume backup
docker exec technama-mysql mysqldump -u root -p'$(cat /root/hadiqa/gohar/TechNama/.env | grep MYSQL_ROOT_PASSWORD | cut -d= -f2)' --all-databases > /root/hadiqa/gohar/TechNama/backups/mysql-full-$(date +%Y%m%d).sql 2>&1

# WordPress files backup
docker cp technama-wordpress:/var/www/html /root/hadiqa/gohar/TechNama/backups/wp-files-$(date +%Y%m%d)/
```

---

## 6. BACKUP VERIFICATION

| Frequency | Action |
|-----------|--------|
| Daily | UpdraftPlus automated backup |
| Weekly | Verify backup exists and is valid |
| Monthly | Test restore procedure |
| Before updates | Manual backup |

---

## 7. EMERGENCY CONTACTS

| Role | Contact |
|------|---------|
| Server Admin | admin@technama.16.jugaar.ai |
| Hosting Support | Support Panel |
| Domain Registrar | Support Panel |
