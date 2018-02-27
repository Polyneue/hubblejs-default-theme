/**
 * Create the default description
 * @param {Object} user - user data from Github
 * @return {String} formatted description
 */
const formatDescription = function (user) {
  let description = `${user.name} is a developer`;

  switch(true) {
    case user.location !== undefined:
      description += ` in ${user.location}`;
    case user.company !== undefined:
      description += ` that works for ${user.company}`;
    default:
      description += '. ';
  }

  description += `They have ${user.repositories.totalCount} featured projects`;
  description += ` and ${user.gists.totalCount} recent gists.`

  return description;
}

module.exports = {
  formatDescription
};
