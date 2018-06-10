const { formatDescription, formatDate, getSocial, getPattern } = require('./utilities');

/**
 * Format the config for working within the theme
 * @param {Object} data - configuration data
 * @return {Object} data with enriched props
 */
const enrichConfig = function (data) {
  const { user } = data;
  const { title, display } = data.theme;

  // Grab the correct number of repositories to display
  if (data.repositories.length > display.repositories) {
    data.repositories = data.repositories.splice(0, display.repositories);
  }

  // Pull out filter options
  data.theme.languages = data.repositories
    .map(function (repo) {
      if (repo.primaryLanguage !== null) return repo.primaryLanguage.name;
      return 'none';
    })
    .filter(function (language, index, arr) {
      return arr.indexOf(language) === index;
    })
    .filter(language => language !== 'none');

  // Grab the correct number of gists to display
  if (data.gists.length > display.gists) {
    data.gists = data.gists.splice(0, display.gists);
  }

  // Grab the correct number of contributions to display
  if (data.contributions.length > display.contributions) {
    data.contributions = data.contributions.splice(0, display.contributions);
  }

  // Format the title
  if (data.theme.meta.title.trim().length === 0) {
    data.theme.meta.title = `${user.name}'s Development Portfolio`;
  }

  // Format the description if one isn't set
  if (data.theme.meta.description.trim().length === 0) {
    data.theme.meta.description = formatDescription(user, title);
  }

  // Build Date
  const date = formatDate(Date.now());
  data.date = date.split(',')[1].trim();

  data.pattern = getPattern(data.theme.pattern.name, data.theme.palette.backgroundAccent);

  // Add the formatDate method
  data.utilities = {
    formatDate,
    getPattern,
    getSocial
  };

  return data;
};

module.exports = enrichConfig;
