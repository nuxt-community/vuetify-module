import { Module } from '@nuxt/types'
import { Framework } from 'vuetify'

import initOptions, { Options } from './options'
import setupAutomaticImports, { VuetifyLoaderOptions } from './automaticImports'
import setupFont from './font'
import setupIcons from './icons'
import setupPlugin from './plugin'
import setupSass from './sass'

declare module '@nuxt/types' {
  interface Configuration {
    vuetify?: Options
  }

  interface Context {
    $vuetify: Framework
  }
}

const vuetifyModule: Module<Options> = function (moduleOptions) {
  this.nuxt.hook('build:before', () => {
    const options = initOptions.call(this, moduleOptions)

    setupSass.call(this, options.customVariables)

    if (typeof options.defaultAssets === 'object') {
      options.defaultAssets.font && setupFont.call(this, options.defaultAssets.font)
      options.defaultAssets.icons && setupIcons.call(this, options.defaultAssets.icons)
    }

    options.automaticImports && setupAutomaticImports.call(this, options.automaticImports)

    setupPlugin.call(this, options)
  })
}

export {
  Options,
  VuetifyLoaderOptions
}

export default vuetifyModule
