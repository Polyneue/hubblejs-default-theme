const fs = require('fs');
const uglify = require('uglify-js'); // eslint-disable-line

const jsIn = './src/js';
const jsOut = './assets/js';

// JS
const options = {
  compress: {
    negate_iife: true
  },
  mangle: {
    toplevel: true
  }
};

/**
 * Build and minify js files from ./src to ./assets
 */
fs.readdir(jsIn, function (err, files) {
  if (err) throw err;
  files.forEach(function (file) {
    fs.readFile(`${jsIn}/${file}`, { encoding: 'utf8' }, function (er, data) {
      if (er) throw er;
      const output = uglify.minify(data, options);

      fs.writeFile(`${jsOut}/${file}`, output.code, function (e) {
        if (e) throw e;
      });
    });
  });
});
