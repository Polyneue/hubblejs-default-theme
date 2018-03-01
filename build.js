const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const mqPacker = require('css-mqpacker');
const cssnano = require('cssnano');
const uglify = require('uglify-js');

const cssIn = './assets/css/project.css';
const cssOut = './assets/css/project.min.css';
const jsIn = './src/js';
const jsOut = './assets/js';

// CSS
fs.readFile(cssIn, function (err, css) {
  postcss([ autoprefixer, mqPacker, cssnano ])
    .process(css, { from: cssIn, to: cssOut })
    .then(function (result) {
      fs.writeFile(cssOut, result.css, function(err) {
        if (err) throw err;
      });
    });
});

// JS
const options = {
  compress: {
    negate_iife: true
  },
  mangle: {
    toplevel: true
  }
};

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