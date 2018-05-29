const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const generateConfig = require('./modules/generate-config');
const enrichConfig = require('./modules/enrich-config');
const generateCSS = require('./modules/generate-css');
const generateJS = require('./modules/generate-js');

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
    const src = fs.readFileSync(srcFile, 'utf8');
    const template = ejs.compile(src, { root: srcPath });

    // Merge the original data with the themes defaults
    data = generateConfig(data);

    // Enrich some theme specific options
    data = enrichConfig(data);

    // Generate CSS/JS to attach to the data object
    data.css = await generateCSS(data);
    data.js = await generateJS(data);

    // Handle Favicon
    fs.copyFileSync(data.theme.meta.favicon, `${dir}/favicon.ico`);

    // Render the template
    const render = template(data);
    return render;
  } catch (err) {
    throw err;
  }
};

module.exports = renderTemplate;
