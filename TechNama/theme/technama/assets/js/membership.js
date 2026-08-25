/**
 * TechNama Membership Features
 * Login/register form toggle, bookmark toggle (AJAX), newsletter unsubscribe.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initLoginRegisterToggle();
    initBookmarkToggle();
    initNewsletterUnsubscribe();
    initMembershipGate();
  });

  /* ------------------------------------------------------------------ */
  /*  Login / Register Form Toggle                                      */
  /* ------------------------------------------------------------------ */
  function initLoginRegisterToggle() {
    var loginForm = document.querySelector('.tn-login-form');
    var registerForm = document.querySelector('.tn-register-form');
    var toggleLinks = document.querySelectorAll('.tn-auth-toggle');

    if (!loginForm && !registerForm) return;

    toggleLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        var target = link.getAttribute('data-form');

        if (target === 'register') {
          if (loginForm) loginForm.style.display = 'none';
          if (registerForm) registerForm.style.display = 'block';
        } else {
          if (loginForm) loginForm.style.display = 'block';
          if (registerForm) registerForm.style.display = 'none';
        }

        toggleLinks.forEach(function (l) {
          l.classList.toggle('tn-auth-toggle--active', l === link);
        });
      });
    });

    var loginSubmit = loginForm ? loginForm.querySelector('form') : null;
    if (loginSubmit) {
      loginSubmit.addEventListener('submit', function (e) {
        e.preventDefault();
        handleAuthSubmission(loginSubmit, 'tn_login');
      });
    }

    var registerSubmit = registerForm ? registerForm.querySelector('form') : null;
    if (registerSubmit) {
      registerSubmit.addEventListener('submit', function (e) {
        e.preventDefault();
        handleAuthSubmission(registerSubmit, 'tn_register');
      });
    }

    var modal = document.querySelector('.tn-auth-modal');
    var openBtns = document.querySelectorAll('.tn-auth-open, .tn-login-required');
    var closeBtn = modal ? modal.querySelector('.tn-auth-modal-close') : null;

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (modal) {
          modal.classList.add('is-open');
          document.body.classList.add('tn-modal-open');
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeModal();
      });
    }

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    function closeModal() {
      if (modal) {
        modal.classList.remove('is-open');
        document.body.classList.remove('tn-modal-open');
      }
    }

    function handleAuthSubmission(form, action) {
      var submitBtn = form.querySelector('button[type="submit"]');
      var messageEl = form.querySelector('.tn-auth-message');
      var originalText = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
      }

      var formData = new FormData(form);
      formData.append('action', action);
      formData.append('nonce', typeof tnMembership !== 'undefined' ? tnMembership.nonce : '');

      fetch(typeof tnMembership !== 'undefined' ? tnMembership.ajax_url : '/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.success) {
            showMessage(messageEl, result.data.message || 'Success!', 'success');
            if (result.data.redirect) {
              setTimeout(function () {
                window.location.href = result.data.redirect;
              }, 1000);
            } else if (result.data.reload) {
              setTimeout(function () {
                window.location.reload();
              }, 1000);
            }
          } else {
            showMessage(messageEl, result.data.message || 'An error occurred.', 'error');
          }
        })
        .catch(function () {
          showMessage(messageEl, 'Network error. Please try again.', 'error');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    }

    function showMessage(el, text, type) {
      if (!el) return;
      el.textContent = text;
      el.className = 'tn-auth-message tn-auth-message--' + type;
      el.style.display = 'block';
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Bookmark Toggle                                                   */
  /* ------------------------------------------------------------------ */
  function initBookmarkToggle() {
    var bookmarkBtns = document.querySelectorAll('.tn-bookmark-btn');

    bookmarkBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        var postId = btn.getAttribute('data-post-id');
        if (!postId) return;

        var isBookmarked = btn.classList.contains('tn-bookmarked');
        var icon = btn.querySelector('.tn-bookmark-icon');
        var count = btn.querySelector('.tn-bookmark-count');

        btn.classList.toggle('tn-bookmarked');
        btn.setAttribute('aria-pressed', String(!isBookmarked));

        if (count) {
          var currentCount = parseInt(count.textContent, 10) || 0;
          count.textContent = isBookmarked ? Math.max(0, currentCount - 1) : currentCount + 1;
        }

        if (icon) {
          if (isBookmarked) {
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
          } else {
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="currentColor"/></svg>';
          }
        }

        var data = new FormData();
        data.append('action', 'tn_toggle_bookmark');
        data.append('post_id', postId);
        data.append('nonce', typeof tnMembership !== 'undefined' ? tnMembership.nonce : '');

        fetch(typeof tnMembership !== 'undefined' ? tnMembership.ajax_url : '/wp-admin/admin-ajax.php', {
          method: 'POST',
          body: data,
          credentials: 'same-origin'
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            if (!result.success) {
              btn.classList.toggle('tn-bookmarked');
              btn.setAttribute('aria-pressed', String(isBookmarked));

              if (count) {
                var c = parseInt(count.textContent, 10) || 0;
                count.textContent = isBookmarked ? c + 1 : Math.max(0, c - 1);
              }

              if (result.data && result.data.message) {
                showBookmarkToast(result.data.message);
              }
            }
          })
          .catch(function () {
            btn.classList.toggle('tn-bookmarked');
            btn.setAttribute('aria-pressed', String(isBookmarked));

            if (count) {
              var c = parseInt(count.textContent, 10) || 0;
              count.textContent = isBookmarked ? c + 1 : Math.max(0, c - 1);
            }
          });
      });
    });

    function showBookmarkToast(message) {
      var existingToast = document.querySelector('.tn-toast');
      if (existingToast) existingToast.remove();

      var toast = document.createElement('div');
      toast.className = 'tn-toast tn-toast--warning';
      toast.setAttribute('role', 'alert');
      toast.textContent = message;

      document.body.appendChild(toast);

      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });

      setTimeout(function () {
        toast.classList.remove('is-visible');
        setTimeout(function () {
          toast.remove();
        }, 300);
      }, 3000);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Newsletter Unsubscribe                                            */
  /* ------------------------------------------------------------------ */
  function initNewsletterUnsubscribe() {
    var unsubBtns = document.querySelectorAll('.tn-newsletter-unsubscribe');

    unsubBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        var email = btn.getAttribute('data-email');
        var token = btn.getAttribute('data-token');

        if (!email || !token) return;

        if (!confirm('Are you sure you want to unsubscribe from our newsletter?')) {
          return;
        }

        var originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Unsubscribing...';

        var data = new FormData();
        data.append('action', 'tn_newsletter_unsubscribe');
        data.append('email', email);
        data.append('token', token);
        data.append('nonce', typeof tnMembership !== 'undefined' ? tnMembership.nonce : '');

        fetch(typeof tnMembership !== 'undefined' ? tnMembership.ajax_url : '/wp-admin/admin-ajax.php', {
          method: 'POST',
          body: data,
          credentials: 'same-origin'
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            if (result.success) {
              var parent = btn.closest('.tn-newsletter-preference, .tn-account-section');
              if (parent) {
                var successMsg = document.createElement('div');
                successMsg.className = 'tn-alert tn-alert--success';
                successMsg.textContent = result.data.message || 'You have been unsubscribed successfully.';
                parent.innerHTML = '';
                parent.appendChild(successMsg);
              }
            } else {
              btn.textContent = originalText;
              btn.disabled = false;
              showUnsubError(result.data.message || 'Unsubscribe failed. Please try again.');
            }
          })
          .catch(function () {
            btn.textContent = originalText;
            btn.disabled = false;
            showUnsubError('Network error. Please try again later.');
          });
      });
    });

    function showUnsubError(message) {
      var existingToast = document.querySelector('.tn-toast');
      if (existingToast) existingToast.remove();

      var toast = document.createElement('div');
      toast.className = 'tn-toast tn-toast--error';
      toast.setAttribute('role', 'alert');
      toast.textContent = message;

      document.body.appendChild(toast);

      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });

      setTimeout(function () {
        toast.classList.remove('is-visible');
        setTimeout(function () {
          toast.remove();
        }, 300);
      }, 4000);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Membership Gate (content restriction)                             */
  /* ------------------------------------------------------------------ */
  function initMembershipGate() {
    var gatedContent = document.querySelectorAll('.tn-membership-gate');

    gatedContent.forEach(function (gate) {
      var expandBtn = gate.querySelector('.tn-gate-expand');
      if (!expandBtn) return;

      expandBtn.addEventListener('click', function (e) {
        e.preventDefault();

        var isLoggedIn = gate.getAttribute('data-logged-in') === 'true';
        var isMember = gate.getAttribute('data-is-member') === 'true';

        if (isLoggedIn && isMember) {
          gate.classList.remove('tn-membership-gate--locked');
          gate.classList.add('tn-membership-gate--unlocked');
          var hiddenContent = gate.querySelector('.tn-gate-content-hidden');
          if (hiddenContent) {
            hiddenContent.style.display = 'block';
          }
          expandBtn.remove();
        } else {
          var modal = document.querySelector('.tn-auth-modal');
          if (modal) {
            modal.classList.add('is-open');
            document.body.classList.add('tn-modal-open');
          } else {
            var loginUrl = typeof tnMembership !== 'undefined' && tnMembership.login_url
              ? tnMembership.login_url
              : '/wp-login.php';
            window.location.href = loginUrl;
          }
        }
      });
    });
  }
})();
