import path from 'path'
import fs from 'fs'
import { Module } from '@nuxt/types/config/module'
import { Options } from './options'

const setupBuild: Module<Options> = function (
  options
) {
  if (!options.treeShake) {
    this.options.css!.push('vuetify/dist/vuetify.css')
  }

  // Enable tree-shaking with VuetifyLoader (https://github.com/vuetifyjs/vuetify-loader)
  if (options.treeShake) {
    const VuetifyLoaderPlugin = this.nuxt.resolver.requireModule(
      'vuetify-loader/lib/plugin'
    );
    (this.options.build!.transpile! as string[]).push('vuetify/lib')

    this.extendBuild((config) => {
      config.plugins!.push(
        new VuetifyLoaderPlugin(
          typeof options.treeShake === 'object'
            ? options.treeShake.loaderOptions
            : {}
        )
      )
    })
  }

  // Remove module options
  const vuetifyOptions = { ...options }
  delete vuetifyOptions.customVariables
  delete vuetifyOptions.defaultAssets
  delete vuetifyOptions.optionsPath
  delete vuetifyOptions.preset
  delete vuetifyOptions.treeShake

  let optionsPath: string | null = this.nuxt.resolver.resolveAlias(
    options.optionsPath ||
      path.join(this.options.dir!.app || 'app', 'vuetify', 'options.js')
  )

  optionsPath = fs.existsSync(optionsPath!) ? optionsPath : null

  // Register options template
  this.addTemplate({
    fileName: `vuetify/options.${
      optionsPath && optionsPath.endsWith('ts') ? 'ts' : 'js'
    }`,
    src: optionsPath || path.resolve(__dirname, '../templates', 'options.js'),
    options: vuetifyOptions
  })

  // Register plugin
  this.addPlugin({
    fileName: 'vuetify/plugin.js',
    src: path.resolve(__dirname, '../templates', 'plugin.js'),
    options: {
      defaultIconPreset: options.defaultAssets && options.defaultAssets.icons,
      preset: options.preset,
      treeShake: options.treeShake
    }
  })
}

export default setupBuild
