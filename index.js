const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mkdirp = require('mkdirp');
const { minify } = require('html-minifier');
const generateConfig = require('./modules/generate-config');
const enrichConfig = require('./modules/enrich-config');

/**
 * Parse data and render the template to HTML
 * @param {Object} data - user data to be rendered
 * @param {String} output - location to write files to
 * @returns {String} rendered HTML
 */
const renderTemplate = async function renderTemplate(data, output) {
  const srcFile = path.join(__dirname, '.', 'index.ejs');
  const srcPath = path.dirname(srcFile);
  const dir = path.dirname(output);

  try {
    // Create output file path
    await mkdirp(dir);

    const src = fs.readFileSync(srcFile, 'utf8');
    const template = ejs.compile(src, { root: srcPath });

    // Merge the original data with the themes defaults
    data = generateConfig(data);

    // Enrich some theme specific options
    data = enrichConfig(data);

    // Copy over assets to the assets directory
    await mkdirp(`${dir}/assets`);

    // Create Pattern SVG
    fs.writeFileSync(`${dir}/assets/pattern.svg`, data.pattern, 'utf8');

    // Handle Favicon
    fs.copyFileSync(data.theme.meta.favicon, `${dir}/favicon.png`);

    // Handle Project and Deferred CSS
    fs.copyFileSync(`${__dirname}/src/css/project.min.css`, `${dir}/assets/project.min.css`);
    fs.copyFileSync(`${__dirname}/src/css/deferred.min.css`, `${dir}/assets/deferred.min.css`);

    // Handle Project JS
    fs.copyFileSync(`${__dirname}/src/js/project.min.js`, `${dir}/assets/project.min.js`);

    // Render the template
    let render = template(data);

    // Minify the HTML
    render = minify(render, {
      minifyCSS: true,
      collapseWhitespace: true
    });

    // Create the html file
    fs.writeFileSync(output, render, 'utf8');

    return;
  } catch (err) {
    throw err;
  }
};

module.exports = renderTemplate;
