import merge from 'deepmerge'

import { VuetifyPreset } from 'vuetify/types/services/presets'
import { ModuleThis } from '@nuxt/types/config/module'

import { VuetifyLoaderOptions } from './loader'
import { FontOptions } from './font'
import { IconPreset } from './icons'

export interface GlobalImports {
  components?: string[]
  directives?: string[]
  transitions?: string[]
}

export interface Options {
  customVariables?: string[]
  defaultAssets?: {
    font?: FontOptions,
    icons?: IconPreset | false
  } | false
  frameworkOptions?: string | Partial<VuetifyPreset>
  globalImports?: GlobalImports
  loader?: boolean | VuetifyLoaderOptions
  preset?: string
}

export const defaults = {
  defaultAssets: {
    font: {
      family: 'Roboto'
    },
    icons: 'mdi' as IconPreset
  },
  loader: true
}

export default function initOptions (this: ModuleThis, moduleOptions?: Options): Required<Options> {
  const options = merge.all([
    defaults,
    this.options.vuetify || {},
    moduleOptions || {}
  ]) as Required<Options>

  return options
}
