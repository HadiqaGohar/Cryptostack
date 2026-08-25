# Cloudflare CDN Setup Guide for TechNama

## Step 1: Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Enter email and password
3. Click Create Account

## Step 2: Add Site
1. Click "Add a Site"
2. Enter: 16.jugaar.ai
3. Select Free plan
4. Click Continue

## Step 3: Update Nameservers
1. Cloudflare will provide 2 nameservers
2. Go to your domain registrar
3. Replace existing nameservers with Cloudflare ones
4. Wait 24-48 hours for propagation

## Step 4: Configure SSL/TLS
1. Go to SSL/TLS → Overview
2. Set to "Full (Strict)"
3. Enable "Always Use HTTPS"
4. Enable "Auto Minify" (JS, CSS, HTML)
5. Enable "Brotli" compression

## Step 5: Configure Speed
1. Go to Speed → Optimization
2. Enable "Auto Minify"
3. Enable "Brotli"
4. Enable "Early Hints"
5. Enable "Rocket Loader" (test first)

## Step 6: Configure Caching
1. Go to Caching → Configuration
2. Set Browser Cache TTL to "Override: 1 month"
3. Set Caching Level to "Standard"

## Step 7: Configure Security
1. Go to Security → Settings
2. Set Security Level to "Medium"
3. Enable "Browser Integrity Check"
4. Enable "Challenge Passage" (30 minutes)

## Step 8: Configure Page Rules
Create rule for WordPress admin:
- URL: *16.jugaar.ai/wp-admin*
- Setting: Security Level - High
- Setting: Bypass Cache

## Step 9: Update WordPress
1. Install "Cloudflare" plugin from WordPress admin
2. Activate plugin
3. Follow setup wizard
4. Enter API key from Cloudflare dashboard

## Step 10: Verify
1. Go to https://www.ssllabs.com/ssltest/ and test
2. Go to https://tools.keycdn.com/performance and test
3. Check Cloudflare analytics dashboard