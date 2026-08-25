/**
 * TechNama Search Enhancement
 * Real-time search suggestions via AJAX and search term highlighting.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initSearchSuggestions();
    initSearchHighlight();
  });

  /* ------------------------------------------------------------------ */
  /*  Real-Time Search Suggestions                                      */
  /* ------------------------------------------------------------------ */
  function initSearchSuggestions() {
    var searchForm = document.querySelector('.tn-search-overlay form, .tn-search-form');
    if (!searchForm) return;

    var input = searchForm.querySelector('input[type="search"], input[type="text"]');
    if (!input) return;

    var suggestionsContainer = createSuggestionsContainer(input);
    var debounceTimer = null;
    var currentIndex = -1;
    var currentResults = [];
    var abortController = null;

    input.setAttribute('autocomplete', 'off');

    input.addEventListener('input', function () {
      var query = input.value.trim();

      clearTimeout(debounceTimer);

      if (query.length < 3) {
        hideSuggestions(suggestionsContainer);
        currentIndex = -1;
        currentResults = [];
        return;
      }

      debounceTimer = setTimeout(function () {
        fetchSuggestions(query, suggestionsContainer);
      }, 300);
    });

    input.addEventListener('keydown', function (e) {
      var items = suggestionsContainer.querySelectorAll('.tn-search-suggestion-item');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = Math.min(currentIndex + 1, items.length - 1);
        updateActiveItem(items, currentIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = Math.max(currentIndex - 1, -1);
        updateActiveItem(items, currentIndex);
      } else if (e.key === 'Enter') {
        if (currentIndex >= 0 && currentIndex < items.length) {
          e.preventDefault();
          var link = items[currentIndex].querySelector('a');
          if (link) {
            window.location.href = link.href;
          }
        }
      } else if (e.key === 'Escape') {
        hideSuggestions(suggestionsContainer);
        currentIndex = -1;
      }
    });

    input.addEventListener('blur', function () {
      setTimeout(function () {
        hideSuggestions(suggestionsContainer);
        currentIndex = -1;
      }, 200);
    });

    input.addEventListener('focus', function () {
      if (suggestionsContainer.children.length > 0 && input.value.trim().length >= 3) {
        suggestionsContainer.style.display = 'block';
      }
    });

    function fetchSuggestions(query, container) {
      if (abortController) {
        abortController.abort();
      }

      abortController = new AbortController();

      var data = new FormData();
      data.append('action', 'tn_search_suggestions');
      data.append('query', query);
      data.append('nonce', typeof tnSearch !== 'undefined' ? tnSearch.nonce : '');

      var ajaxUrl = typeof tnSearch !== 'undefined' ? tnSearch.ajax_url : '/wp-admin/admin-ajax.php';

      fetch(ajaxUrl, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
        signal: abortController.signal
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.success && result.data && result.data.length > 0) {
            currentResults = result.data;
            renderSuggestions(container, result.data, query);
          } else {
            hideSuggestions(container);
            currentResults = [];
          }
        })
        .catch(function (err) {
          if (err.name !== 'AbortError') {
            hideSuggestions(container);
          }
        });
    }

    function renderSuggestions(container, results, query) {
      container.innerHTML = '';

      var header = document.createElement('div');
      header.className = 'tn-search-suggestions-header';
      header.textContent = 'Search Results';
      container.appendChild(header);

      results.forEach(function (item, index) {
        var el = document.createElement('div');
        el.className = 'tn-search-suggestion-item';

        var title = highlightText(item.title || '', query);
        var excerpt = item.excerpt ? highlightText(item.excerpt, query) : '';

        el.innerHTML =
          '<a href="' + (item.url || '#') + '" class="tn-search-suggestion-link">' +
            '<div class="tn-search-suggestion-thumb">' +
              (item.thumbnail
                ? '<img src="' + item.thumbnail + '" alt="" loading="lazy">'
                : '<div class="tn-search-suggestion-thumb-placeholder"></div>') +
            '</div>' +
            '<div class="tn-search-suggestion-info">' +
              '<h4 class="tn-search-suggestion-title">' + title + '</h4>' +
              (excerpt ? '<p class="tn-search-suggestion-excerpt">' + excerpt + '</p>' : '') +
              (item.date ? '<span class="tn-search-suggestion-date">' + item.date + '</span>' : '') +
            '</div>' +
          '</a>';

        container.appendChild(el);
      });

      var viewAll = document.createElement('div');
      viewAll.className = 'tn-search-suggestions-footer';
      viewAll.innerHTML = '<a href="' + getSearchUrl(query) + '" class="tn-search-view-all">View all results &rarr;</a>';
      container.appendChild(viewAll);

      container.style.display = 'block';
    }

    function updateActiveItem(items, index) {
      items.forEach(function (item, i) {
        item.classList.toggle('is-active', i === index);
      });

      if (index >= 0 && items[index]) {
        input.setAttribute('aria-activedescendant', 'tn-suggestion-' + index);
        items[index].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }
  }

  function createSuggestionsContainer(input) {
    var existing = input.parentNode.querySelector('.tn-search-suggestions');
    if (existing) return existing;

    var container = document.createElement('div');
    container.className = 'tn-search-suggestions';
    container.setAttribute('role', 'listbox');
    container.setAttribute('aria-label', 'Search suggestions');
    container.style.display = 'none';

    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(container);

    return container;
  }

  function hideSuggestions(container) {
    if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
    }
  }

  function highlightText(text, query) {
    if (!query || !text) return text || '';

    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp('(' + escaped + ')', 'gi');
    return text.replace(regex, '<mark class="tn-search-highlight">$1</mark>');
  }

  function getSearchUrl(query) {
    var searchUrl = '/';
    if (typeof tnSearch !== 'undefined' && tnSearch.search_url) {
      searchUrl = tnSearch.search_url;
    }
    return searchUrl + '?s=' + encodeURIComponent(query);
  }

  /* ------------------------------------------------------------------ */
  /*  Highlight Search Terms in Results                                 */
  /* ------------------------------------------------------------------ */
  function initSearchHighlight() {
    var searchResults = document.querySelector('.tn-search-results, .tn-results');
    if (!searchResults) return;

    var urlParams = new URLSearchParams(window.location.search);
    var query = urlParams.get('s');
    if (!query) return;

    var contentElements = searchResults.querySelectorAll(
      '.tn-card-title, .tn-card-excerpt, .tn-card-body, .entry-content p, .search-result-content'
    );

    contentElements.forEach(function (el) {
      highlightElement(el, query);
    });
  }

  function highlightElement(el, query) {
    if (!el || !query) return;

    var walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    var textNodes = [];
    var node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp('(' + escaped + ')', 'gi');

    textNodes.forEach(function (textNode) {
      var text = textNode.textContent;
      if (!regex.test(text)) return;

      regex.lastIndex = 0;
      var fragment = document.createDocumentFragment();
      var parts = text.split(regex);

      parts.forEach(function (part) {
        if (regex.test(part)) {
          var mark = document.createElement('mark');
          mark.className = 'tn-search-highlight';
          mark.textContent = part;
          fragment.appendChild(mark);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
        regex.lastIndex = 0;
      });

      textNode.parentNode.replaceChild(fragment, textNode);
    });
  }
})();
