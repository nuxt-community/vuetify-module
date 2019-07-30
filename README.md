<p align="center">
  <img src="https://user-images.githubusercontent.com/904724/59509947-c14eca80-8eb2-11e9-807c-14e7cc72eecc.png" alt="nuxt-tailwindcss" width="500"/>
</p>
<p align="center">
  <a href="https://npmjs.com/package/@nuxtjs/vuetify"><img src="https://img.shields.io/npm/v/@nuxtjs/vuetify.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.com/package/@nuxtjs/vuetify"><img src="https://img.shields.io/npm/dt/@nuxtjs/vuetify.svg?style=flat-square" alt="npm version"></a>
  <a href="https://circleci.com/gh/nuxt-community/vuetify-module"><img src="https://img.shields.io/circleci/project/github/nuxt-community/vuetify-module.svg?style=flat-square" alt="circle ci"></a>
  <a href="https://codecov.io/gh/nuxt-community/vuetify-module"><img src="https://img.shields.io/codecov/c/github/nuxt-community/vuetify-module.svg?style=flat-square" alt="coverage"></a>
  <a href="https://www.npmjs.com/package/@nuxtjs/vuetify"><img src="https://img.shields.io/npm/l/@nuxtjs/vuetify.svg?style=flat-square" alt="License"></a>
</p>

> [Vuetify 2](https://vuetifyjs.com) module for [Nuxt.js](https://nuxtjs.org)

## Infos

- [📖 **Release Notes**](./CHANGELOG.md)
- [🏀 **Online playground**](https://codesandbox.io/s/nuxtjs-vuetify-v0k7i)
- [🛠 **Migration guide from Vuetify 1.5.x**](./MIGRATION_GUIDE.md)
- [🏷 **Module for Vuetify 1.5.x**](https://github.com/nuxt-community/vuetify-module/tree/0.x)

## Setup

1. Add `@nuxtjs/vuetify` dependency to your project

```bash
yarn add --dev @nuxtjs/vuetify # or npm install --save-dev @nuxtjs/vuetify
```

2. Add `@nuxtjs/vuetify` to the `devModules` section of `nuxt.config.js`

```js
{
  devModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', { /* module options */ }]
  ]
}
```

### Using top level options

```js
{
  devModules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    /* module options */
  }
}
```

## Options

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
  icons: 'mdi'
}
```

Automatically handle **Roboto** font & **Material Design Icons**.

These assets are handled automatically by default to provide a zero-configuration which let you play directly with Vuetify.

`defaultAssets.font` automatically adds the **Roboto** font stylesheet from official google fonts to load the font with `font-display: swap`.
You can disable it if you plan to use different font or manually handle font loading.

`defaultAssets.icons` automatically adds the icons stylesheet from a CDN to load all the icons (**not optimized for production**).  
Here are the accepted values for this option :

| Value | Icons |
|-------|-------|
| `'mdi'` (default) | [Material Designs Icons](https://materialdesignicons.com/) ([CDN](https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css)) 
| `'md'`  | [Material Icons](https://material.io/resources/icons/) ([CDN](https://fonts.googleapis.com/css?family=Material+Icons))
| `'fa'` |  [Font Awesome 5](https://fontawesome.com/icons) ([CDN](https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css))
| `'fa4'` |  [Font Awesome 4](https://fontawesome.com/v4.7.0/icons/) ([CDN](https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css))
| `false` | Disable auto add of the icons stylesheet

> This option (if not set to `false`) will automatically override `icons.iconfont` Vuetify option so that Vuetify components use these icons.

Please refer to [Vuetify Icons documentation](https://vuetifyjs.com/en/customization/icons) for more information about icons, notably for using only bunch of SVG icons instead of including all icons in your app.

You can also set the whole `defaultAssets` option to `false` to prevent any automatic add of these two assets.

### `treeShake`

- Type: `Boolean`
- Default: `process.env.NODE_ENV === 'production'`

Uses [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to enable automatic [tree-shaking](https://vuetifyjs.com/en/customization/a-la-carte).
Enabled only for production by default.

## TypeScript

If you're using TypeScript, you'll need to add `@nuxtjs/vuetify` in your `compilerOptions` of your `tsconfig.json` :

```json
{
  "compilerOptions": {
    "types": [
      "@types/node",
      "@nuxt/vue-app",
      "@nuxtjs/vuetify"
    ]
  }
}
```

You'll then be able to have autocompletion in Context (`ctx.$vuetify`) and Vue instances (`this.$vuetify`).

## Migration Guide from Vuetify 1.5.x

You'll find a step by step guide to upgrade from 1.5.x to 2.x [here](./MIGRATION_GUIDE.md)

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community
