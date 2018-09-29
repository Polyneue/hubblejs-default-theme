const merge = require('deepmerge');
const path = require('path');

const generateConfig = function (data) {
  const options = {
    theme: {
      title: 'Developer',
      description: '',
      meta: {
        description: '',
        title: '',
        favicon: path.join(__dirname, '..', 'src', 'favicon-32x32.png')
      },
      type: 'light',
      display: {
        repositories: 9,
        gists: 8,
        contributions: 8
      },
      palette: {
        primary: '#F94878',
        secondary: '#753AA8',
        textPrimary: '#000F3E',
        background: '#FEFEFE',
        backgroundRGB: '254, 254, 254',
        backgroundAccent: '#EFEFF4',
        backgroundAccentLight: '#F8F8FA'
      },
      navigation: {},
      pattern: {
        name: 'morphing diamonds',
        size: '100px'
      }
    }
  };

  // Merge configs together
  const config = merge(options, data);

  // Merge dark options if theme dark is specified
  if (config.theme.type === 'dark') {
    config.theme.palette = merge(config.theme.palette, {
      textPrimary: '#EEEEEE',
      background: '#1A1A1A',
      backgroundRGB: '26, 26, 26',
      backgroundAccent: '#3B3B3B',
      backgroundAccentLight: '#434343'
    });
  }

  return config;
};

module.exports = generateConfig;
