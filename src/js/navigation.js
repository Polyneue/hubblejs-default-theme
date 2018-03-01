(function (d) {
  var isActive = 'is-active';
  var navToggle = d.getElementById('js-nav-toggle');
  var header = d.getElementById('js-header');
  navToggle.addEventListener('click', function (evt) {
    evt.preventDefault();
    header.classList.toggle(isActive);
    navToggle.classList.toggle(isActive);
  });
})(document);