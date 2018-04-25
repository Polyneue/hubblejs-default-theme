/* eslint-env browser */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const isActive = 'is-active';
    const isHidden = 'is-faded';

    const filter = document.querySelectorAll('.js-filter-toggle');
    const projects = document.querySelectorAll('.js-filter-project');

    /**
     * Toggle active on project elements
     * @param {String} language - language to filter on
     * @param {Array} items - collection of html elements
     */
    function filterProjects(language, items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemLanguage = item.getAttribute('data-language');

        if (itemLanguage !== language && language !== 'all') {
          item.classList.add(isHidden);
        } else {
          item.classList.remove(isHidden);
        }
      }
    }

    for (let i = 0; i < filter.length; i++) {
      filter[i].addEventListener('click', function () {
        const language = this.getAttribute('data-language');

        for (let j = 0; j < filter.length; j++) {
          filter[j].classList.remove('is-active');
        }

        this.classList.add(isActive);
        filterProjects(language, projects);
      });
    }
  });
}());
