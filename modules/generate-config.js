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
      palette: {
        primary: '#F94878',
        secondary: '#753AA8'
      },
      navigation: {},
      pattern: {
        name: 'polka dots',
        fill: '#EEE',
        size: '20px',
        opacity: 1.0
      }
    }
  };

  return merge(config, data);
};

module.exports = generateConfig;
