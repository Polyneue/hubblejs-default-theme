const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const generateConfig = require('./generateConfig');

/**
 * Parse data and render the template to HTML
 * @param {Object} data - user data to be rendered
 * @returns {String} rendered HTML
 */
const renderTemplate = async function renderTemplate(data) {
  const srcFile = path.join(__dirname, '.', 'index.ejs');
  const srcPath = path.dirname(srcFile);

  return new Promise(async function (resolve, reject) {
    try {
      const src = await fs.readFileSync(srcFile, 'utf8');
      const template = ejs.compile(src, { root: srcPath });
      const tmpData = generateConfig(data);
      const render = template(tmpData);

      resolve(render);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = renderTemplate;