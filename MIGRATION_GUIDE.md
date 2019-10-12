# Migrate from 1.5.x to 2.x.x using Vuetify Module

> Note that **Vuetify 1.5.x** is handled by **@nuxtjs/vuetify@0.x.x**   
Meanwhile **Vuetify 2.x.x** is now handled by the last versions of the module : **@nuxtjs/vuetify@1.x.x**

## I. Clean up dependencies

Using `yarn remove` (or `npm uninstall`), remove the following dependencies from your project :

```
@nuxtjs/vuetify
vuetify
vuetify-loader
node-sass
sass-loader
```

## II. Installation

Install `@nuxtjs/vuetify` as devDependency :

```sh
yarn add --dev @nuxtjs/vuetify # npm install --save-dev @nuxtjs/vuetify
```

## III. Migrating module options

- `materialIcons` has been removed and default resources added by the module like icons & fonts are now handled by [`defaultAssets`](https://github.com/nuxt-community/vuetify-module#defaultassets) option.

- `css` has been removed, it will includes full Vuetify css only in development mode when `treeShake` is falsy.

- `treeShake` works the same, its default value is `false` in development (`nuxt dev`) and `true` in production (`nuxt build` & `nuxt generate`).

## IV. Migrating font & icons

By default, the Nuxt module doesn't load [Material Icons](https://material.io/resources/icons/) anymore. It still load Roboto font but now use [Material Design Icons (MDI)](https://materialdesignicons.com/).

Please see the [`defaultAssets`](https://github.com/nuxt-community/vuetify-module#defaultassets) option if you need more freedom.


## V. Follow official [Vuetify 2 Upgrade Guide](https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide)

You can now follow the official Vuetify guide, and directly begin at the **Framework** section, skipping the **Boostrap** section whichs is handled by the Nuxt module.

Note that `Theme` and `Icons` sections detailed in their guide will be options you'll pass to the Nuxt module. You can skip `Styles` section as the Nuxt module already ships `sass`.

Then it will be mostly upgrading your components to the new specifications.

Have fun using Vuetify 2 !
