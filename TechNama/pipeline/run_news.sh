#!/bin/bash
cd /root/hadiqa/gohar/TechNama/pipeline
python3 pipeline.py >> logs/cron_news.log 2>&1
