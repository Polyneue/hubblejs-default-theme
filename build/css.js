/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const mqPacker = require('css-mqpacker');
const cssnano = require('cssnano');
const sass = require('node-sass');

const src = path.join(__dirname, '..', 'src', 'scss');
const dist = path.join(__dirname, '..', 'src', 'css');

const plugins = [autoprefixer, mqPacker({ sort: true }), cssnano];

/**
 * Read and process the SCSS file
 * @param {String} input - entry scss file
 * @param {String} output - output min.css file
 */
const writeScss = async function (input, output) {
  try {
    // Render SCSS
    const res = sass.renderSync({ file: input });
    const css = res.css.toString();

    // Post process the compiled sass
    const data = await postcss(plugins).process(css, { from: undefined });

    // Write the css files
    fs.writeFileSync(output, data, 'utf8');

    console.log(`Built: ${input} to ${output}`); // eslint-disable-line
  } catch (err) {
    throw err;
  }
};

(async function () {
  try {
    let files = fs.readdirSync(src, 'utf8');

    // Filter out the partials directory
    files = files.filter(file => !file.match(/(partials)/gi));

    // Run the files through the scss writer
    await Promise.all(files.map(function (file) {
      const outFile = file.replace('.scss', '.min.css');
      return writeScss(`${src}/${file}`, `${dist}/${outFile}`);
    }));
  } catch (err) {
    throw err;
  }
}());
