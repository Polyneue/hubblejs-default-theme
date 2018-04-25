/* eslint-env browser */
(function () {
  const isActive = 'is-active';
  const navToggle = document.getElementById('js-nav-toggle');
  const header = document.getElementById('js-header');

  navToggle.addEventListener('click', function (evt) {
    evt.preventDefault();
    header.classList.toggle(isActive);
    navToggle.classList.toggle(isActive);
  });
}());
