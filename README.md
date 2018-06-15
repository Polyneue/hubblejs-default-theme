# HubbleJS Default Theme

## Introduction
This is the default theme for [HubbleJS](https://github.com/Polyneue/hubblejs), the developer portfolio powered by Github. This theme makes it easy to get an optimized and easily customizable portfolio site up in minutes.

## Features

* Easily customizable via colors, patterns, and project selection
* Fast page speed due to static files
* Web Accessibility Support
* Structured data for [Schema.org](http://schema.org/)

## Getting Started

After following installation instructions for [HubbleJS](https://github.com/Polyneue/hubblejs), configure the theme property for the HubbleJS configuration.

```javascript
const Hubble = require('hubble.js');

// Instantiate an instance of HubbleJS
const hubble = new Hubble({
  username: 'GITHUB_USERNAME',
  token: 'GITHUB_TOKEN',
  theme: {
    // Options here
  }
});

hubble.generate();
```

## Configuration

The HubbleJS default theme has a number of configurable options to make the end results unique for each generated site. All theme configuration properties are optional.

### `theme`

* `title` String - Professional title. Default: "Developer".
* `description` String - Bio content. Default: "{user} is a {title} in {location} at {company}".
* `meta` Object - HTML meta data
    * `description` String - the page description meta tag. Default: `theme.description`.
    * `title` String - title tag text. Default: "{user}'s Development Portfolio"
    * `favicon` String - path to custom favicon file. Default is HubbleJS favicon.
* `navigation` Object - Navigation definitions, each key will be displayed in the navigation bar and the value will be the url associated with that key.
    * **EX:** `Blog: 'my-blog.com'`
* `type` String - Choose between `dark` or `light` mode. Default: `light`.
* `palette` Object - Color definitions
    * `primary` String - Color in hex format. Default is `#F94878`.
    * `secondary` String - Color in hex format. Default is `#753AA8`.
* `pattern` Object - Pattern definitions
    * `name` String - The name of the pattern from [Hero Patterns](http://www.heropatterns.com/). Default: "morphing diamonds".
    * `size` String - Pattern background size. Default: `100px`
* `social` Object - Social media definitions
    * `behance` String - url
    * `bitbucket` String - url
    * `codepen` String - url
    * `dribbble` String - url
    * `facebook` String - url
    * `github` String - url
    * `instagram` String - url
    * `linkedin` String - url
    * `medium` String - url
    * `npm` String - url
    * `stackoverflow` String - url
    * `twitter` String - url

### Example

An example of a HubbleJS instance with a theme configuration.

```javascript
const hubble = new Hubble({
  username: 'GH_USER_NAME',
  token: 'GH_ACCESS_TOKEN',
  theme: {
    meta: {
      title: 'My New HubbleJS Site'
    },
    type: 'dark',
    palette: {
      primary: '#3498db',
      secondary: '#2c3e50'
    },
    navigation: {
      blog: "https://www.myexample.com/blog"
    },
    pattern: {
      name: 'dominos',
      scale: '50%'
    },
    socialMedia: {
      behance: 'https://behance.com/myUser'
    }
  }
});

```

## Versioning

The HubbleJS default theme uses [SemVer](http://semver.org/) for versioning. For available versions, see the [tags for this repository](/tags).

## Copyright and License

Code copyright 2018 Ed Mendoza. Code released under the [MIT license](blob/master/LICENSE)
