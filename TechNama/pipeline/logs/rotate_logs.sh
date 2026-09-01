#!/bin/bash
# Log rotation - keep last 7 days of logs
LOG_DIR="/root/hadiqa/gohar/TechNama/pipeline/logs"
KEEP_DAYS=7

# Remove old pipeline logs
find "$LOG_DIR" -name "pipeline_*.log" -mtime +$KEEP_DAYS -delete 2>/dev/null

# Truncate cron_news.log if > 1MB
CRON_LOG="$LOG_DIR/cron_news.log"
if [ -f "$CRON_LOG" ] && [ $(stat -c%s "$CRON_LOG" 2>/dev/null || echo 0) -gt 1048576 ]; then
    tail -1000 "$CRON_LOG" > "$CRON_LOG.tmp" && mv "$CRON_LOG.tmp" "$CRON_LOG"
fi

# Truncate cron_youtube.log if > 500KB
YT_LOG="$LOG_DIR/cron_youtube.log"
if [ -f "$YT_LOG" ] && [ $(stat -c%s "$YT_LOG" 2>/dev/null || echo 0) -gt 512000 ]; then
    tail -500 "$YT_LOG" > "$YT_LOG.tmp" && mv "$YT_LOG.tmp" "$YT_LOG"
fi
