# Vuetify 2 Alpha Module

[![David-DM][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Vuetify 2 Alpha Module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

- Add `@nuxtjs/vuetify@next` as devDependency using yarn or npm to your project
- Add `@nuxtjs/vuetify` to `devModules` section of your `nuxt.config.js`

```js
{
  devModules: [
    '@nuxtjs/vuetify'
  ],

  // Vuetify options
  vuetify: {
    //  theme: { }
  }
}
```

## Module options

### `assets`
- Type: `Object` or `Boolean` 
- Default: 
```js
{
  font: true,
  icons: true
}
```

Automatically handle **Roboto** font & **Material Design Icons**.

These assets are handled automatically by default to provide a zero-configuration which let you play directly with Vuetify.

We recommend to set it to `false` and : 
1) Handle **Roboto** web font loading with [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader)
2) Choose and setup your preferred icons preset by following [Vuetify Icons documentation](https://next.vuetifyjs.com/en/framework/icons)

### `treeShake`
- Type: `Boolean`
- Default: `process.env.NODE_ENV === 'production'`

Uses [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to enable automatic [tree-shaking](https://next.vuetifyjs.com/en/guides/a-la-carte).  
Enabled only for production by default.


## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
[david-dm-src]: https://david-dm.org/nuxt-community/vuetify-module/status.svg?branch=next&style=flat-square
[david-dm-href]: https://david-dm.org/nuxt-community/vuetify-module
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/vuetify-module/next.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/vuetify-module/tree/next
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/vuetify-module/next.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/vuetify-module/branch/next
[npm-version-src]: https://img.shields.io/npm/dt/@nuxtjs/vuetify.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/vuetify
[npm-downloads-src]: https://img.shields.io/npm/v/@nuxtjs/vuetify/next.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/vuetify
