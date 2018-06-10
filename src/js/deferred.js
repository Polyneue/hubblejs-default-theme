/* eslint-env browser */
(function (w, d) {
  const loadDeferredStyles = function () {
    const noscript = d.getElementById('deferred-styles');
    const styleNode = d.createElement('div');
    styleNode.innerHTML = noscript.textContent;
    d.body.appendChild(styleNode);
    noscript.parentElement.removeChild(noscript);
  };

  const raf = w.requestAnimationFrame
    || w.mozRequestAnimationFrame
    || w.webkitRequestAnimationFrame
    || w.msRequestAnimationFrame;

  if (raf) {
    raf(function () {
      w.setTimeout(loadDeferredStyles, 0);
    });
  } else {
    w.addEventListener('load', loadDeferredStyles);
  }
}(window, document));
