"""
Brevo (Sendinblue) Newsletter Sender
Sends newsletter emails to subscribers via Brevo API
"""
import requests
import json
import os
import logging
from datetime import datetime
from config import BREVO_API_KEY, BREVO_LIST_ID, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME, WP_URL, DATA_DIR

logger = logging.getLogger(__name__)

BREVO_API_BASE = "https://api.brevo.com/v3"

def _get_headers():
    """Get Brevo API headers."""
    return {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        "accept": "application/json",
    }


def get_subscribers():
    """Get all active subscribers from Brevo list."""
    if not BREVO_API_KEY:
        logger.warning("[Brevo] No API key configured")
        return []
    
    try:
        url = f"{BREVO_API_BASE}/contacts"
        params = {"listIds": BREVO_LIST_ID, "limit": 500}
        resp = requests.get(url, headers=_get_headers(), params=params, timeout=30)
        
        if resp.status_code == 200:
            data = resp.json()
            contacts = data.get("contacts", [])
            # Filter only active contacts
            active = [c for c in contacts if c.get("emailBlacklisted") is False]
            logger.info(f"[Brevo] Found {len(active)} active subscribers")
            return active
        else:
            logger.error(f"[Brevo] Get subscribers failed: {resp.status_code} {resp.text[:200]}")
            return []
    except Exception as e:
        logger.error(f"[Brevo] Get subscribers error: {e}")
        return []


def add_contact(email, first_name=None, last_name=None):
    """Add or update a contact in Brevo list."""
    if not BREVO_API_KEY:
        logger.warning("[Brevo] No API key configured, skipping contact sync")
        return False
    
    try:
        url = f"{BREVO_API_BASE}/contacts"
        payload = {
            "email": email,
            "listIds": [BREVO_LIST_ID],
            "updateEnabled": True,
        }
        if first_name:
            payload["attributes"] = {"FIRSTNAME": first_name}
        if last_name:
            if "attributes" not in payload:
                payload["attributes"] = {}
            payload["attributes"]["LASTNAME"] = last_name
        
        resp = requests.post(url, headers=_get_headers(), json=payload, timeout=30)
        
        if resp.status_code in (200, 201):
            logger.info(f"[Brevo] Contact added/updated: {email}")
            return True
        elif resp.status_code == 400 and "already exists" in resp.text.lower():
            logger.info(f"[Brevo] Contact already exists: {email}")
            return True
        else:
            logger.warning(f"[Brevo] Add contact failed: {resp.status_code} {resp.text[:200]}")
            return False
    except Exception as e:
        logger.error(f"[Brevo] Add contact error: {e}")
        return False


def remove_contact(email):
    """Remove a contact from Brevo (unsubscribe)."""
    if not BREVO_API_KEY:
        return False
    
    try:
        # First get the contact ID
        url = f"{BREVO_API_BASE}/contacts"
        params = {"email": email}
        resp = requests.get(url, headers=_get_headers(), params=params, timeout=30)
        
        if resp.status_code == 200:
            contact_id = resp.json().get("id")
            if contact_id:
                # Remove from list
                del_url = f"{BREVO_API_BASE}/contacts/{contact_id}/lists/{BREVO_LIST_ID}"
                del_resp = requests.delete(del_url, headers=_get_headers(), timeout=30)
                if del_resp.status_code in (200, 204):
                    logger.info(f"[Brevo] Contact removed: {email}")
                    return True
        
        logger.warning(f"[Brevo] Could not remove contact: {email}")
        return False
    except Exception as e:
        logger.error(f"[Brevo] Remove contact error: {e}")
        return False


def send_newsletter(post_id, title, excerpt, category, image_url, article_url):
    """Send newsletter to all active subscribers about a new article."""
    if not BREVO_API_KEY:
        logger.warning("[Brevo] No API key configured, cannot send newsletter")
        return False
    
    subscribers = get_subscribers()
    if not subscribers:
        logger.info("[Brevo] No subscribers to send to")
        return False
    
    # Compose email HTML
    html_content = _compose_email(title, excerpt, category, image_url, article_url)
    
    # Send to each subscriber (Brevo transactional API)
    sent_count = 0
    failed_count = 0
    
    for contact in subscribers:
        email = contact.get("email")
        if not email:
            continue
        
        try:
            url = f"{BREVO_API_BASE}/smtp/email"
            payload = {
                "sender": {
                    "name": BREVO_SENDER_NAME,
                    "email": BREVO_SENDER_EMAIL,
                },
                "to": [{"email": email}],
                "subject": f"📰 {title[:50]}... | TechNama",
                "htmlContent": html_content,
                "tags": ["newsletter", category],
                "params": {
                    "ARTICLE_TITLE": title,
                    "ARTICLE_URL": article_url,
                    "CATEGORY": category,
                },
            }
            
            resp = requests.post(url, headers=_get_headers(), json=payload, timeout=30)
            
            if resp.status_code in (200, 201):
                sent_count += 1
            else:
                failed_count += 1
                logger.warning(f"[Brevo] Send to {email} failed: {resp.status_code}")
        except Exception as e:
            failed_count += 1
            logger.error(f"[Brevo] Send error to {email}: {e}")
    
    logger.info(f"[Brevo] Newsletter sent: {sent_count} success, {failed_count} failed out of {len(subscribers)} subscribers")
    
    # Log the send
    _log_send(post_id, title, sent_count, failed_count)
    
    return sent_count > 0


def _compose_email(title, excerpt, category, image_url, article_url):
    """Compose newsletter HTML email."""
    # Category color mapping
    category_colors = {
        "it-news": "#37215F",
        "ai-cloud": "#0881BE",
        "cybersecurity": "#dc2626",
        "startups": "#16a34a",
        "tech-reviews": "#f59e0b",
    }
    cat_color = category_colors.get(category, "#37215F")
    
    # Clean excerpt
    if excerpt:
        # Remove HTML tags
        import re
        clean_excerpt = re.sub(r'<[^>]+>', '', excerpt)
        clean_excerpt = clean_excerpt[:200] + "..." if len(clean_excerpt) > 200 else clean_excerpt
    else:
        clean_excerpt = "Read the full article on TechNama for complete details."
    
    # Image HTML
    image_html = ""
    if image_url:
        image_html = f'<img src="{image_url}" alt="{title}" style="width:100%;max-width:600px;height:auto;border-radius:8px;margin-bottom:16px;" />'
    
    html = f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;">
    
    <!-- Header -->
    <div style="background:#37215F;padding:20px;text-align:center;">
        <a href="{WP_URL}" style="text-decoration:none;">
            <img src="{WP_URL}/wp-content/uploads/2026/08/itin-logo-pakistan-01.png" 
                 style="max-width:80px;height:auto;" alt="TechNama" />
        </a>
    </div>
    
    <!-- Category Badge -->
    <div style="padding:16px 20px 0;text-align:center;">
        <span style="display:inline-block;background:{cat_color};color:#ffffff;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">
            {category.replace('-', ' ').title()}
        </span>
    </div>
    
    <!-- Content -->
    <div style="padding:16px 20px;">
        {image_html}
        <h2 style="color:#1a1a2e;font-size:22px;line-height:1.3;margin:0 0 12px;">
            <a href="{article_url}" style="color:#1a1a2e;text-decoration:none;">{title}</a>
        </h2>
        <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 20px;">
            {clean_excerpt}
        </p>
        <a href="{article_url}" 
           style="display:inline-block;background:#0881BE;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;font-size:15px;">
            Read Full Article →
        </a>
    </div>
    
    <!-- Divider -->
    <div style="padding:0 20px;"><hr style="border:none;border-top:1px solid #eee;margin:20px 0;" /></div>
    
    <!-- Footer -->
    <div style="padding:16px 20px;background:#f9fafb;text-align:center;">
        <p style="color:#999;font-size:12px;margin:0 0 8px;">
            You received this because you subscribed to TechNama newsletter.
        </p>
        <p style="color:#999;font-size:12px;margin:0;">
            <a href="{WP_URL}/unsubscribe/?email=EMAIL_PLACEHOLDER" style="color:#0881BE;text-decoration:underline;">Unsubscribe</a>
            &nbsp;|&nbsp;
            <a href="{WP_URL}" style="color:#0881BE;text-decoration:underline;">Visit TechNama</a>
        </p>
    </div>
    
</div>
</body>
</html>"""
    return html


def _log_send(post_id, title, sent, failed):
    """Log newsletter send to file."""
    log_file = os.path.join(DATA_DIR, "newsletter_log.json")
    logs = []
    if os.path.exists(log_file):
        try:
            with open(log_file) as f:
                logs = json.load(f)
        except:
            logs = []
    
    logs.append({
        "timestamp": datetime.now().isoformat(),
        "post_id": post_id,
        "title": title,
        "sent": sent,
        "failed": failed,
    })
    
    # Keep last 500 entries
    if len(logs) > 500:
        logs = logs[-500:]
    
    with open(log_file, "w") as f:
        json.dump(logs, f, indent=2)


if __name__ == "__main__":
    print("Brevo Sender module loaded successfully")
    print(f"API Key: {'Set' if BREVO_API_KEY else 'NOT SET'}")
    print(f"List ID: {BREVO_LIST_ID}")
    print(f"Sender: {BREVO_SENDER_EMAIL}")
