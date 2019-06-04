# Vuetify 2 Module

[![David-DM][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Vuetify 2 Module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)  
[🏷 **Module for Vuetify 1.5.x `[master]`**](https://github.com/nuxt-community/vuetify-module/tree/master)

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

### `customVariables`
- Type: `Array`
  - Items: `String`
- Default: `[]`

Provide a way to customize Vuetify SASS variables.  
**Only works with [tree-shaking](#treeShake).**

Usage example : 

```scss
// assets/variables.scss
@import '~vuetify/src/styles/styles.sass';

// The variables you want to modify
$font-size-root: 14px;
// For updating SASS lists
$material-light: map-merge($material-light, ( cards: blue ));
$btn-border-radius: 0px;
```

```js
// nuxt.config.js
export default {
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  }
}
```


### `defaultAssets`
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

`defaultAssets.font` automatically adds the **Roboto** font stylesheet from official google fonts to load the font with `font-display: swap`.
You can disable it if you plan to use different font or manually handle font loading.

`defaultAssets.icons` automatically adds the icons stylesheet from [Material Design Icons](https://materialdesignicons.com) CDN to load all the icons.
You can disable it and choose and setup your preferred icons preset by following [Vuetify Icons documentation](https://next.vuetifyjs.com/en/framework/icons)

You can also set `defaultAssets` to `false` to prevent any automatic add of these two assets.

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
