const path = require('path');
const { promisify } = require('util');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const mqPacker = require('css-mqpacker');
const cssnano = require('cssnano');
const sass = require('node-sass');

const sassRenderAsync = promisify(sass.render);

const src = path.join(__dirname, '..', 'src', 'scss', 'project.scss');
const plugins = [autoprefixer, mqPacker({ sort: true }), cssnano];

/**
 * Format variables to string
 * @param {String} obj - sass obj where key:value is variable
 * @return {String} formatted sass
 */
const handleVariables = function (obj) {
  const variables = [];
  const props = Object.keys(obj);

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const value = obj[props[i]];
    let output = `'${value}'`;

    if (Array.isArray(value)) {
      const arr = value.join(',');
      output = arr;
    }

    variables.push(`$${prop}:${output};`);
  }
  return variables.join('\n');
};

/**
 * Handle generating SCSS content
 * @param {String} entry - entry scss project file
 * @param {Object} variables - dynamic vars for sass
 */
const dynamicSass = async function (entry, variables) {
  const data = `${handleVariables(variables)}@import "${entry}";`;
  const entryPath = path.dirname(entry);
  const sassOptions = {
    includePaths: [
      entryPath,
      path.join(__dirname, '..', '..', '..', 'node_modules')
    ],
    data
  };

  try {
    const res = await sassRenderAsync(sassOptions);
    return res.css.toString();
  } catch (err) {
    throw err;
  }
};

/**
 * Generate and optimize css given options
 * @param {Object} data - theme objects
 * @return {String} css output
 */
const generateCSS = async function (data) {
  const { type, socialCSS, pattern } = data.theme;
  const { primary, secondary } = data.theme.palette;

  const variables = {
    type,
    primary,
    secondary,
    'social-media': socialCSS,
    'pattern-name': pattern.name,
    'pattern-fill': pattern.fill,
    'pattern-opacity': pattern.opacity,
    'pattern-size': pattern.size
  };

  try {
    const css = await dynamicSass(src, variables);
    const output = await postcss(plugins).process(css, { from: undefined });
    return output;
  } catch (err) {
    throw err;
  }
};

module.exports = generateCSS;
