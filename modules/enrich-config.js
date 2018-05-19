const { formatDescription, formatDate } = require('./utilities');

/**
 * Format the config for working within the theme
 * @param {Object} data - configuration data
 * @return {Object} data with enriched props
 */
const enrichConfig = function (data) {
  const { user, repositories } = data;
  const { title, social, display } = data.theme;

  // Pull out filter options
  data.theme.languages = repositories
    .map(repo => repo.primaryLanguage.name)
    .filter(function (language, index, arr) {
      return arr.indexOf(language) === index;
    });

  // Grab the correct number of repositories to display
  if (data.repositories.length > display.repositories) {
    data.repositories = data.repositories.splice(0, display.repositories);
  }

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

  // Format the social media object
  data.theme.socialCSS = (social) ? Object.keys(social) : 'false';

  // Build Date
  const date = formatDate(Date.now());
  data.date = date.split(',')[1].trim();

  // Add the formatDate method
  data.utilities = {
    formatDate
  };

  return data;
};

module.exports = enrichConfig;
