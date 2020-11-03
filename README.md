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

2. Add `@nuxtjs/vuetify` to the `buildModules` section of `nuxt.config.js`

:warning: If you are using Nuxt `< 2.9.0`, use `modules` instead.

```js
{
  buildModules: [
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
  buildModules: [
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

// Variables you want to modify
$btn-border-radius: 0px;

// If you need to extend Vuetify SASS lists
$material-light: ( cards: blue );

@import '~vuetify/src/styles/styles.sass';
```

```js
// nuxt.config.js
export default {
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  }
}
```

> The list of customizable variables can be found by looking at the files [here](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/styles/settings).

### `defaultAssets`

- Type: `Object` or `Boolean` 
- Default: 
```js
{
  font: {
    family: 'Roboto' 
  },
  icons: 'mdi'
}
```

By default, automatically handle **Roboto** font & **Material Design Icons**.

These assets are handled automatically by default to provide a zero-configuration which let you play directly with Vuetify.

`defaultAssets.font.family` automatically adds the specified font (default **Roboto**) stylesheet from official google fonts to load the font with `font-display: swap`.
If you have [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader) in your `modules`, it will use it automatically.

`defaultAssets.font.size` allows you to specify the root font size in your application.

:warning: If you choose a custom font family (i.e. not **Roboto**), it will automatically override Vuetify SASS variables (`$body-font-family` & `font-size-root`), but you will need [tree-shaking](#treeShake) to be enabled to have them correctly applied.

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
You can read more about adding your own assets in the [Offline applications](https://github.com/nuxt-community/vuetify-module#offline-applications) section. 

### `optionsPath`

- Type: `String`

Location of the Vuetify options that will be passed to Vuetify.

This file will be compiled by **webpack**, which means you'll benefit fast hot reload when changing these options, but also be able to use TypeScript without being forced to use TypeScript runtime.

```js
// nuxt.config.js
export default {
  vuetify: {
    optionsPath: './vuetify.options.js'
  }
}
```

> Note that you can also use [Directory Aliases](https://nuxtjs.org/guide/directory-structure#aliases) like `'~/path/to/option.js'`

All vuetify options are supported, it includes : 
- [**Breakpoints**](https://vuetifyjs.com/en/customization/breakpoints)
- [**Icons**](https://vuetifyjs.com/en/customization/icons)
- [**Internationalization (i18n)**](https://vuetifyjs.com/en/customization/internationalization)
- [**RTL (bidirectionality)**](https://vuetifyjs.com/en/customization/rtl)
- [**Theme**](https://vuetifyjs.com/en/customization/theme) 


```js
// vuetify.options.js
export default {
  breakpoint: {},
  icons: {},
  lang: {},
  rtl: true,
  theme: {}
}
```

> Notice that passing the Vuetify options directly to Module options is still supported, but it will trigger Nuxt entire rebuild if options are changed.

If you need to access Nuxt context within the options file, you need to export a function instead :


```js
// vuetify.options.js
export default function ({ app }) {
  return {
    lang: {
      t: (key, ...params) => app.i18n.t(key, params)
    }
  }
}
```

### `treeShake`

- Type: `Object` or `Boolean`
- Default: `process.env.NODE_ENV === 'production'`

Uses [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to enable automatic [tree-shaking](https://vuetifyjs.com/en/customization/a-la-carte).
Enabled only for production by default.

You can set object as a set of options to [manually import](https://vuetifyjs.com/en/features/treeshaking/#manually-importing) Vuetify modules globally:

| Key | Type | Value |
| --- | --- | --- |
| components | string[] | array of name of Vuetify components to import globally |
| directives | string[] | array of name of Vuetify directives to import globally |
| loaderOptions | function | loader option which applies to VuetifyLoaderPlugin |
| transitions | string[] | array of name of [Vuetify transitions](https://vuetifyjs.com/en/styles/transitions/) to import globally |

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

## Offline applications

If you're building an application that will need to work offline (more likely a [**PWA**](https://pwa.nuxtjs.org/)), you will need to bundle your fonts and icons in your app instead of using online resources.

It means you must set [`defaultAssets`](#defaultAssets) option to `false`.

For fonts, you may leverage CSS [**@font-face**](https://www.w3schools.com/cssref/css3_pr_font-face_rule.asp) rule with local path of your fonts. You may find the [google webfonts helper](https://google-webfonts-helper.herokuapp.com/fonts/roboto?subsets=latin) site useful for generating **@font-face** rules and sourcing replacement files for the default CDNs.

For icons, you can either use the same way than above, or leverage tree-shaken SVG libraries like [**Material Design Icons SVG**](https://github.com/Templarian/MaterialDesign-JS) or [**Font Awesome 5 SVG**](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core).

## Migration Guide from Vuetify 1.5.x

You'll find a step by step guide to upgrade from 1.5.x to 2.x [here](./MIGRATION_GUIDE.md)

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community
