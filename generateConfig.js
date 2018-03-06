const path = require('path');
const merge = require('deepmerge');
const { formatDescription, formatRole, formatSocial } = require('./utilities');

const generateConfig = function (data) {
  const { user } = data;
  const role = data.theme.title || 'Developer';
  const social = data.theme.socialMedia || false;

  // Default Configuration
  const config = {
    theme: {
      role: formatRole(user, role),
      description: false,
      meta: {
        description: formatDescription(user, role),
        title: `${user.name}'s Development Portfolio`,
        favicon: '' // TODO: Figure out how to load in a default favicon
      },
      type: 'light',
      palette: {
        primary: '#F94878',
        secondary: '#753AA8'
      },
      navigation: {},
      pattern: {
        name: 'polka-dots',
        color: '#EEE',
        size: '20px'
      },
      social: formatSocial(social)
    }
  };

  return merge(config, data);
}

module.exports = generateConfig;