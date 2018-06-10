/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const babelPresetEnv = require('babel-preset-env');
const UglifyJS = require('uglify-js');

const src = path.join(__dirname, '..', 'src', 'js');
const dist = path.join(__dirname, '..', 'src', 'js', 'project.min.js');

/**
 * Read the file and resolve or reject the contents
 * @param {String} filePath - path to file
 * @return {String} contents of a file
 */
const readFile = function (filePath) {
  try {
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });
    return content;
  } catch (err) {
    throw err;
  }
};

(async function () {
  try {
    let files = fs.readdirSync(src, { encoding: 'utf8' });
    files = files
      .filter(fileName => fileName !== 'project.min.js')
      .map(fileName => `${src}/${fileName}`);

    let contents = await Promise.all(files.map(readFile));
    contents = contents.join('');

    let output = babel.transform(contents, { presets: [babelPresetEnv] });
    output = UglifyJS.minify(output.code);

    // Write the JS file
    fs.writeFileSync(dist, output.code, 'utf8');

    console.log(`Built JS to ${dist}`); // eslint-disable-line
  } catch (err) {
    throw err;
  }
}());
