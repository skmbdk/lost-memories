(function () {
  if (window.__lmButterSmooth) return;
  window.__lmButterSmooth = true;

  var BUTTER_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  var BUTTER_DURATION = 380;

  var root = document.documentElement;

  function promoteAnimatedNodes() {
    var nodes = document.querySelectorAll('[style*="transform"], [style*="opacity"], [class*="transition"]');
    for (var i = 0; i < nodes.length; i += 1) {
      nodes[i].style.willChange = 'transform, opacity';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', promoteAnimatedNodes, { once: true });
  } else {
    promoteAnimatedNodes();
  }

  if (typeof Element !== 'undefined' && Element.prototype && typeof Element.prototype.animate === 'function') {
    var originalAnimate = Element.prototype.animate;

    Element.prototype.animate = function (keyframes, options) {
      var patchedOptions = options;

      if (patchedOptions == null) {
        patchedOptions = { duration: BUTTER_DURATION };
      } else if (typeof patchedOptions === 'number') {
        patchedOptions = { duration: patchedOptions };
      } else {
        patchedOptions = Object.assign({}, patchedOptions);
      }

      if (patchedOptions.duration == null) patchedOptions.duration = BUTTER_DURATION;
      if (patchedOptions.easing == null || patchedOptions.easing === 'ease') {
        patchedOptions.easing = BUTTER_EASE;
      }

      return originalAnimate.call(this, keyframes, patchedOptions);
    };
  }

  requestAnimationFrame(function () {
    root.classList.add('butter-smooth-ready');
  });
})();
