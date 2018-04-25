const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const babelPresetEnv = require('babel-preset-env');

const src = path.join(__dirname, '..', 'src', 'js');

/**
 * Read the file and resolve or reject the contents
 * @param {String} filePath - path to file
 * @return {String} contents of a file
 */
const readFile = function (filePath) {
  return new Promise(async function (resolve, reject) {
    try {
      const content = await fs.readFileSync(`${src}/${filePath}`);
      resolve(content);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Read the JS files and create a single output
 * @param {Object} data - theme objects
 * @return {String} js output
 */
const generateJS = async function () {
  try {
    const files = await fs.readdirSync(src);
    const fileData = await Promise.all(files.map(readFile));

    let output = fileData.join('');
    output = babel.transform(output, { presets: [babelPresetEnv] });

    return output.code;
  } catch (err) {
    throw err;
  }
};

module.exports = generateJS;
