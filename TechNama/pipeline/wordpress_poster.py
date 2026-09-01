"""
WordPress Auto-Poster
Posts articles to WordPress via REST API or MySQL
"""
import requests
import json
import re
import subprocess
import mimetypes
import os
from datetime import datetime
from config import WP_URL, WP_USER, WP_APP_PASSWORD, MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB

def upload_featured_image(image_path, title='Featured Image'):
    """Upload an image to WordPress and return the attachment ID"""
    if not image_path or not os.path.exists(image_path):
        print(f"[Image Upload] File not found: {image_path}")
        return None

    filename = os.path.basename(image_path)
    mime_type = mimetypes.guess_type(image_path)[0] or 'image/jpeg'

    # Try REST API first
    if WP_APP_PASSWORD and WP_APP_PASSWORD != 'will-be-set-later':
        try:
            endpoint = f"{WP_URL}/wp-json/wp/v2/media"
            headers = {
                'Content-Disposition': f'attachment; filename="{filename}"',
                'Content-Type': mime_type,
            }
            auth = (WP_USER, WP_APP_PASSWORD)
            with open(image_path, 'rb') as f:
                resp = requests.post(endpoint, data=f, headers=headers, auth=auth, timeout=30)
            if resp.status_code in (200, 201):
                data = resp.json()
                print(f"[Image Upload] REST API success: ID={data['id']}")
                return data['id']
            else:
                print(f"[Image Upload] REST API failed: {resp.status_code} {resp.text[:200]}")
        except Exception as e:
            print(f"[Image Upload] REST API error: {e}")

    # Fallback: upload via MySQL (insert into wp_posts + wp_postmeta)
    try:
        import pymysql
        conn = pymysql.connect(host=MYSQL_HOST, user=MYSQL_USER, password=MYSQL_PASS,
                               database=MYSQL_DB, charset='utf8mb4')
        cursor = conn.cursor()

        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        with open(image_path, 'rb') as f:
            image_data = f.read()

        # Determine upload path
        upload_path = datetime.now().strftime('%Y/%m')

        # Insert attachment
        cursor.execute("""
            INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content,
                                  post_title, post_excerpt, post_status, post_type, post_name,
                                  comment_status, ping_status, menu_order, to_ping, pinged,
                                  post_modified, post_modified_gmt, post_content_filtered, guid,
                                  post_mime_type)
            VALUES (1, %s, %s, '', %s, '', 'inherit', 'attachment', %s, 'open', 'open',
                    0, '', '', %s, %s, '', %s, %s)
        """, (now, now, title, filename, now, now, f"{WP_URL}/?attachment_id=0", mime_type))
        attachment_id = cursor.lastrowid

        # Update guid with actual ID and correct path
        guid = f"{WP_URL}/wp-content/uploads/{upload_path}/{filename}"
        cursor.execute("UPDATE wp_posts SET guid = %s WHERE ID = %s", (guid, attachment_id))

        # Copy file to WordPress container
        try:
            container_path = f'/var/www/html/wp-content/uploads/{upload_path}/{filename}'
            result = subprocess.run(['docker', 'cp', image_path, f'technama-wordpress:{container_path}'], 
                                  check=True, capture_output=True, text=True)
            print(f"  Copied image to container: {container_path}")
        except Exception as e:
            print(f"  WARNING: Failed to copy image to container: {e}")

        # Set attachment metadata with dimensions
        try:
            from PIL import Image as PILImage
            with PILImage.open(image_path) as img:
                width, height = img.size
        except:
            width, height = 800, 450
        full_upload_path = f'{upload_path}/{filename}'
        meta_value = f'a:5:{{s:5:"width";i:{width};s:6:"height";i:{height};s:14:"hwstring_small";s:{len(str(height)+"x"+str(width))}:"{height}x{width}";s:4:"file";s:{len(full_upload_path)}:"{full_upload_path}";s:10:"sizes";a:0:{{}}}}'
        cursor.execute("""
            INSERT INTO wp_postmeta (post_id, meta_key, meta_value)
            VALUES (%s, '_wp_attachment_metadata', %s)
        """, (attachment_id, meta_value))

        cursor.execute("""
            INSERT INTO wp_postmeta (post_id, meta_key, meta_value)
            VALUES (%s, '_wp_attached_file', %s)
        """, (attachment_id, f'{upload_path}/{filename}'))

        # Store the web-accessible URL for reference (not the local filesystem path)
        cursor.execute("""
            INSERT INTO wp_postmeta (post_id, meta_key, meta_value)
            VALUES (%s, 'technama_image_url', %s)
        """, (attachment_id, guid))

        conn.commit()
        cursor.close()
        conn.close()

        print(f"[Image Upload] MySQL success: ID={attachment_id}")
        return attachment_id
    except Exception as e:
        print(f"[Image Upload] MySQL error: {e}")
        return None


def get_featured_image_for_category(category_slug):
    """Get the attachment ID for a category's featured image (fallback only)."""
    CATEGORY_FEATURED_IMAGES = {
        'it-news': 71,
        'startups': 72,
        'cybersecurity': 73,
        'ai-cloud': 74,
        'tech-reviews': 75,
        'live-shows': 76,
    }
    return CATEGORY_FEATURED_IMAGES.get(category_slug, 71)  # Default to it-news

def post_via_rest_api(title, content, status='publish', category_ids=None, featured_image_id=None):
    if not WP_APP_PASSWORD or WP_APP_PASSWORD == 'will-be-set-later':
        return post_via_mysql(title, content, status, category_ids, featured_image_id)
    endpoint = f"{WP_URL}/wp-json/wp/v2/posts"
    headers = {'Content-Type': 'application/json'}
    auth = (WP_USER, WP_APP_PASSWORD)
    payload = {
        'title': title,
        'content': content,
        'status': status,
    }
    if category_ids:
        payload['categories'] = category_ids
    if featured_image_id:
        payload['featured_media'] = featured_image_id
    try:
        resp = requests.post(endpoint, json=payload, headers=headers, auth=auth, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        return {'id': data['id'], 'link': data.get('link', ''), 'status': 'published'}
    except Exception as e:
        print(f"[REST API Error] {e}")
        return post_via_mysql(title, content, status, category_ids, featured_image_id)

def post_via_mysql(title, content, status='publish', category_ids=None, featured_image_id=None):
    try:
        import pymysql
        conn = pymysql.connect(host=MYSQL_HOST, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_DB, charset='utf8mb4')
        cursor = conn.cursor()
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        slug = re.sub(r'[^a-z0-9]+', '-', title.lower())[:50]
        cursor.execute("""
            INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, 
                                  post_excerpt, post_status, post_type, post_name, comment_status, ping_status, 
                                  menu_order, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered)
            VALUES (1, %s, %s, %s, %s, '', %s, 'post', %s, 'open', 'open', 0, '', '', %s, %s, '')
        """, (now, now, content, title, status, slug, now, now))
        post_id = cursor.lastrowid
        if category_ids:
            for cat_id in category_ids:
                cursor.execute("INSERT INTO wp_term_relationships (object_id, term_taxonomy_id) VALUES (%s, %s)", (post_id, cat_id))
        if featured_image_id:
            cursor.execute("INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (%s, '_thumbnail_id', %s)", (post_id, featured_image_id))
        cursor.execute("UPDATE wp_posts SET guid = %s WHERE ID = %s", (f"{WP_URL}/?p={post_id}", post_id))
        conn.commit()
        cursor.close()
        conn.close()
        return {'id': post_id, 'link': f"{WP_URL}/?p={post_id}", 'status': 'published'}
    except Exception as e:
        print(f"[MySQL Error] {e}")
        return {'id': 0, 'link': '', 'status': f'error: {e}'}

def get_or_create_category(name, slug=None):
    try:
        import pymysql
        conn = pymysql.connect(host=MYSQL_HOST, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_DB, charset='utf8mb4')
        cursor = conn.cursor()
        if not slug:
            slug = re.sub(r'[^a-z0-9]+', '-', name.lower())
        cursor.execute("SELECT term_id FROM wp_terms WHERE slug = %s", (slug,))
        row = cursor.fetchone()
        if row:
            cursor.close()
            conn.close()
            return row[0]
        cursor.execute("INSERT INTO wp_terms (name, slug, term_group) VALUES (%s, %s, 0)", (name, slug))
        term_id = cursor.lastrowid
        cursor.execute("INSERT INTO wp_term_taxonomy (term_id, taxonomy, description, count) VALUES (%s, 'category', '', 0)", (term_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return term_id
    except Exception as e:
        print(f"[Category Error] {e}")
        return 0

if __name__ == '__main__':
    print("WordPress Poster module loaded successfully")
