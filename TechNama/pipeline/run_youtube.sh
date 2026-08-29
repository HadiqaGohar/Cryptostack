#!/bin/bash
cd /root/hadiqa/gohar/TechNama/pipeline
python3 youtube_discovery.py >> logs/cron_youtube.log 2>&1
