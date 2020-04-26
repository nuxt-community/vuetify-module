import path from 'path'
import { ModuleThis } from '@nuxt/types/config/module'
import { Options } from './options'

export default function setupPlugin (this: ModuleThis, options: Options) {
  // Transpile Vuetify
  this.options.build!.transpile!.push('vuetify')

  const optionsPath = typeof options.frameworkOptions === 'string' && this.nuxt.resolver.resolveAlias(options.frameworkOptions)

  // Register options template
  this.addTemplate({
    fileName: `vuetify/options.${optionsPath && optionsPath.endsWith('ts') ? 'ts' : 'js'}`,
    src: optionsPath || path.resolve(__dirname, '../templates', 'options.js'),
    options: options.frameworkOptions || {}
  })

  // Register plugin
  this.addPlugin({
    fileName: 'vuetify/plugin.js',
    src: path.resolve(__dirname, '../templates', 'plugin.js'),
    options: {
      defaultIconPreset: options.defaultAssets && options.defaultAssets.icons,
      globalImports: options.globalImports,
      preset: options.preset
    }
  })
}
