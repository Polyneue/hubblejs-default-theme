const merge = require('deepmerge');

const generateConfig = function (data) {
  const config = {
    theme: {
      title: 'Developer',
      description: '',
      meta: {
        description: '',
        title: '',
        favicon: '' // TODO: Figure out how to load in defaults
      },
      type: 'light',
      display: {
        repositories: 9,
        gists: 8,
        contributions: 8
      },
      palette: {
        primary: '#F94878',
        secondary: '#753AA8'
      },
      navigation: {},
      pattern: {
        name: 'polka dots',
        size: '20px'
      }
    }
  };

  return merge(config, data);
};

module.exports = generateConfig;
