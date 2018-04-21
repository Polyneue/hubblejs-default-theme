const { formatDescription, formatRole } = require('./utilities');

/**
 * Format the config for working within the theme
 * @param {Object} data - configuration data
 * @return {Object} data with enriched props
 */
const enrichConfig = function (data) {
  const { user, repositories } = data;
  const { title, social } = data.theme;

  // Format and add the role
  data.theme.role = formatRole(user, title);

  // Pull out filter options
  data.theme.languages = repositories
    .map(repo => repo.primaryLanguage.name)
    .filter(function (language, index, arr) {
      return arr.indexOf(language) === index;
    });

  // Format the title
  if (data.theme.meta.title.trim().length === 0) {
    data.theme.meta.title = `${user.name}'s Development Portfolio`;
  }

  // Format the description if one isn't set
  if (data.theme.meta.description.trim().length === 0) {
    data.theme.meta.description = formatDescription(user, title);
  }

  // Format the social media object
  if (social !== undefined) {
    data.theme.socialCSS = Object.keys(data.theme.social);
  }

  return data;
};

module.exports = enrichConfig;
