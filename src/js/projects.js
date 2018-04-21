(function (d) {
  // TODO: Revisit this with babel possibly
  d.addEventListener('DOMContentLoaded', function () {
    var isActive = 'is-active';
    var isHidden = 'is-faded';

    var filter = d.querySelectorAll('.js-filter-toggle');
    var projects = d.querySelectorAll('.js-filter-project');

    /**
     * Toggle active on project elements
     * @param {String} language - language to filter on
     * @param {Array} items - collection of html elements
     */
    function filterProjects(language, items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemLanguage = item.getAttribute('data-language');

        if (itemLanguage !== language && language !== 'all') {
          item.classList.add(isHidden);
        } else {
          item.classList.remove(isHidden);
        }
      }
    }

    for (var i = 0; i < filter.length; i++) {
      filter[i].addEventListener('click', function () {
        var language = this.getAttribute('data-language');

        for (var j = 0; j < filter.length; j++) {
          filter[j].classList.remove('is-active');
        }

        this.classList.add(isActive);
        filterProjects(language, projects);
      });
    }
  });
}(document));
