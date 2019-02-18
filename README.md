# Vuetify Module

[![David-DM][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Vuetify Module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

- Add `@nuxtjs/vuetify` dependency using yarn or npm to your project
- Add `@nuxtjs/vuetify` to `modules` section of your `nuxt.config.js`

```js
{
  modules: [
    '@nuxtjs/vuetify'
  ],

  // Vuetify options
  vuetify: {
    //  theme: { }
  }
}
```

## Module options

### `materialIcons`
- Default: `true`
Adds **Material Icons** from google fonts api.

### `css`
- Default: `true`
Adds `vuetify.css` to the start of `options.css[]`

### `treeShake`
- Default: `false`
Uses [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to enable automatic [tree-shaking](https://vuetifyjs.com/en/guides/a-la-carte).
Make sure you add the `vuetify-loader`, `stylus-loader` and `stylus` dependencies using yarn or npm to your project first.

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
[david-dm-src]: https://david-dm.org/nuxt-community/vuetify-module/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/nuxt-community/vuetify-module
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/vuetify-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/vuetify-module
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/vuetify-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/vuetify-module
[npm-version-src]: https://img.shields.io/npm/dt/@nuxtjs/vuetify.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/vuetify
[npm-downloads-src]: https://img.shields.io/npm/v/@nuxtjs/vuetify/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/vuetify
