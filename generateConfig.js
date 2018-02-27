const path = require('path');
const merge = require('deepmerge');
const { formatDescription } = require('./utilities');

const generateConfig = function (data) {
  const { user } = data;

  // Default Configuration
  const config = {
    theme: {
      src: {
        html: path.join(__dirname, '.', 'index.ejs'),
        assets: path.join(__dirname, '.', 'assets')
      },
      meta: {
        description: formatDescription(user),
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
        color: '#DDDDDD',
        scale: '30px'
      },
      socialMedia: {}
    }
  };

  return merge(config, data);
}

module.exports = generateConfig;