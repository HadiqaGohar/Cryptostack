<?php
/**
 * Cookie Consent Banner - GDPR Compliance
 * Shows on first visit, stores consent in localStorage
 */
if (is_user_logged_in()) return; ?>
<div id="tn-cookie-consent" class="tn-cookie-consent" style="display:none;">
    <div class="tn-cookie-inner">
        <div class="tn-cookie-text">
            <p>🍪 We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. <a href="<?php echo esc_url(home_url('/cookie-policy/')); ?>">Privacy Policy</a></p>
        </div>
        <div class="tn-cookie-actions">
            <button id="tn-cookie-accept" class="tn-btn tn-btn-sm tn-btn-primary">Accept All</button>
            <button id="tn-cookie-reject" class="tn-btn tn-btn-sm tn-btn-outline">Reject</button>
        </div>
    </div>
</div>
<style>
.tn-cookie-consent {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1a1a2e;
    color: #fff;
    padding: 16px 24px;
    z-index: 99999;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
    animation: slideUp 0.4s ease-out;
}
@keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}
.tn-cookie-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}
.tn-cookie-text p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
}
.tn-cookie-text a {
    color: #4FC3F7;
    text-decoration: underline;
}
.tn-cookie-actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
}
.tn-btn-sm {
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}
.tn-btn-primary {
    background: #0881BE;
    color: #fff;
}
.tn-btn-primary:hover { background: #066a9a; }
.tn-btn-outline {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.3);
}
.tn-btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.1); }
@media (max-width: 768px) {
    .tn-cookie-inner { flex-direction: column; text-align: center; }
    .tn-cookie-actions { justify-content: center; }
}
</style>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var consent = localStorage.getItem('tn_cookie_consent');
    if (!consent) {
        var banner = document.getElementById('tn-cookie-consent');
        if (banner) banner.style.display = 'block';
    }
    var acceptBtn = document.getElementById('tn-cookie-accept');
    var rejectBtn = document.getElementById('tn-cookie-reject');
    if (acceptBtn) acceptBtn.addEventListener('click', function() {
        localStorage.setItem('tn_cookie_consent', 'accepted');
        document.getElementById('tn-cookie-consent').style.display = 'none';
    });
    if (rejectBtn) rejectBtn.addEventListener('click', function() {
        localStorage.setItem('tn_cookie_consent', 'rejected');
        document.getElementById('tn-cookie-consent').style.display = 'none';
    });
});
</script>
