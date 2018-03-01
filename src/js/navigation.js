(function () {
  var isActive = 'is-active';
  var navToggle = document.getElementById('js-nav-toggle');
  var header = document.getElementById('js-header');
  navToggle.addEventListener('click', function (e) {
    e.preventDefault();
    header.classList.toggle(isActive);
    navToggle.classList.toggle(isActive);
  });
})();