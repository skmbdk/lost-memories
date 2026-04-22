(function () {
  if (window.__lmKeyboardNavFallback) return;
  window.__lmKeyboardNavFallback = true;

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = (el.tagName || '').toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
  }

  function findTargetHref(direction) {
    var selector = direction === 'next'
      ? 'a.cursor-e-resize[href], a[class*="cursor-e-resize"][href]'
      : 'a.cursor-w-resize[href], a[class*="cursor-w-resize"][href]';

    var el = document.querySelector(selector);
    if (!el) return null;

    var href = el.getAttribute('href');
    if (!href || !href.trim()) return null;

    try {
      return new URL(href, window.location.href).href;
    } catch (err) {
      return href;
    }
  }

  document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    if (isTypingTarget(event.target)) return;

    var direction = null;
    if (event.key === 'ArrowRight') direction = 'next';
    if (event.key === 'ArrowLeft') direction = 'prev';
    if (!direction) return;

    var targetHref = findTargetHref(direction);
    if (!targetHref) return;

    event.preventDefault();
    window.location.assign(targetHref);
  }, true);
})();
