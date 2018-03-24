/* eslint-disable no-fallthrough */

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
 * Create the default description
 * @param {Object} user - user data from Github
 * @param {String} role - role for the user
 * @return {String} formatted role
 */
const formatRole = function (user, role) {
  let description = `${role}`;

  switch (true) {
    case user.company !== undefined:
      description += ` at ${user.company}`;
    case user.location !== undefined:
      description += ` in ${user.location}`;
    default:
      return description;
  }
};

module.exports = {
  formatDescription,
  formatRole
};
