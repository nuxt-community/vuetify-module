<p align="center">
  <img src="https://user-images.githubusercontent.com/904724/59509947-c14eca80-8eb2-11e9-807c-14e7cc72eecc.png" alt="nuxt-tailwindcss" width="500"/>
</p>
<p align="center">
  <a href="https://npmjs.com/package/@nuxtjs/vuetify"><img src="https://img.shields.io/npm/v/@nuxtjs/vuetify/next.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.com/package/@nuxtjs/vuetify"><img src="https://img.shields.io/npm/dt/@nuxtjs/vuetify.svg?style=flat-square" alt="npm version"></a>
  <a href="https://circleci.com/gh/nuxt-community/vuetify-module"><img src="https://img.shields.io/circleci/project/github/nuxt-community/vuetify-module.svg?style=flat-square" alt="circle ci"></a>
  <a href="https://codecov.io/gh/nuxt-community/vuetify-module"><img src="https://img.shields.io/codecov/c/github/nuxt-community/vuetify-module/next.svg?style=flat-square" alt="coverage"></a>
  <a href="https://www.npmjs.com/package/@nuxtjs/vuetify"><img src="https://badgen.net/npm/license/@nuxtjs/vuetify" alt="License"></a>
</p>

> [Vuetify 2](https://vuetifyjs.com) module for [Nuxt.js](https://nuxtjs.org)

## Infos

- [📖 Release Notes](./CHANGELOG.md)
- [🏀 Online playground](https://codesandbox.io/s/nuxtjs-vuetify-olyxr)
- [🏷 Module for Vuetify 1.5.x `[master]`](https://github.com/nuxt-community/vuetify-module/tree/master)

## Setup

- Add `@nuxtjs/vuetify@next` dependency to your project

```bash
npm install --save-dev @nuxtjs/vuetify@next # or yarn add --dev @nuxtjs/vuetify@next
```

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
