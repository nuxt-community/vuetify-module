import { Module } from '@nuxt/types'
import { Framework } from 'vuetify'

import initOptions, { Options, TreeShakeOptions, VuetifyLoaderOptions } from './options'
import setupBuild from './build'
import setupFont from './font'
import setupIcons from './icons'
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

    if (typeof options.defaultAssets === 'object') {
      options.defaultAssets.font && setupFont.call(this, options.defaultAssets.font)
      options.defaultAssets.icons && setupIcons.call(this, options.defaultAssets.icons)
    }

    setupSass.call(this, options.customVariables)
    setupBuild.call(this, options)
  })
}

export {
  Options,
  TreeShakeOptions,
  VuetifyLoaderOptions
}

export default vuetifyModule
