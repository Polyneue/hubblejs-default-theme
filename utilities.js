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

  switch(true) {
    case user.location !== undefined:
      description += ` in ${user.location}`;
    case user.company !== undefined:
      description += ` at ${user.company}`;
    default:
      description += '. ';
  }

  description += `They have ${user.repositories.totalCount} featured projects`;
  description += ` and ${user.gists.totalCount} recent gists.`

  return description;
}

/**
 * Create the default description
 * @param {Object} user - user data from Github
 * @param {String} role - role for the user
 * @return {String} formatted role
 */
const formatRole = function (user, role) {
  let description = `${role}`;

  switch(true) {
    case user.company !== undefined:
    description += ` at ${user.company}`;
    case user.location !== undefined:
      description += ` in ${user.location}`;
    default:
      return description;
  }
}

/**
 * Format social media for the template
 * @param {Object} social - social media accounts
 * @return {Object} formatted social accounts
 */
const formatSocial = function (social) {
  if (!social) return false;

  const socialPalette = {
    behance: '#0057ff',
    bitbucket: '#0057D8',
    codepen: '#111111',
    dribbble: '#df3e7b',
    facebook: '#29487d',
    github: '#24292e',
    instagram: '#3897f0',
    linkedin: '#0073b1',
    medium: '#029e74',
    npm: '#C12127',
    stackoverflow: '#F48024',
    twitter: '#1da1f2'
  };

  const socialResult = {};

  for (let account in social) {
    socialResult[account] = {
      url: social[account],
      color: socialPalette[account]
    }
  }

  return socialResult;
}

module.exports = {
  formatDescription,
  formatRole,
  formatSocial
};
