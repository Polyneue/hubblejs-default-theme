/* eslint-disable no-fallthrough */
const patterns = require('../src/patterns.json');
const brands = require('../src/social.json');

/**
 * Get brand object for social media
 * @param {String} name - name of brand to get
 * @return {Object} brand
 */
const getSocial = function (name) {
  return brands[name];
};

/**
 * Get SVG from patterns map
 * @param {String} name - pattern name
 * @param {String} color - color for svg path
 * @return {String} pattern
 */
const getPattern = function (name, color) {
  const pattern = name.toLowerCase();
  let svg = patterns[pattern];
  const hex = color.replace('#', '%23');

  svg = svg.replace("fill='black'", `fill='${hex}'`);

  return svg;
};

/**
 * Create the default description
 * @param {Object} user - user data from Github
 * @param {String} role - role for the user
 * @return {String} formatted description
 */
const formatDescription = function (user, role) {
  const match = new RegExp('(a|e|i|o|u)', 'i');
  const aVan = (match.test(role.charAt(0))) ? 'an' : 'a';

  let description = `${user.name} is ${aVan} ${role}`;

  switch (true) {
    case user.location !== undefined:
      description += ` in ${user.location}`;
    case user.company !== undefined:
      description += ` at ${user.company}`;
    default:
      description += '. ';
  }

  description += `They have ${user.repositories.totalCount} featured projects`;
  description += ` and ${user.gists.totalCount} recent gists.`;

  return description;
};

/**
 * Date to be parsed
 * @param {String} date - to be parsed
 * @return {String} formatted date time
 */
const formatDate = function (date) {
  const dateInput = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  return dateInput.toLocaleDateString('en-US', options);
};

module.exports = {
  formatDescription,
  formatDate,
  getSocial,
  getPattern
};
