import merge from 'deepmerge'

import { VuetifyPreset } from 'vuetify/types/presets'
import { ModuleThis } from '@nuxt/types/config/module'

import { VuetifyLoaderOptions } from './automaticImports'
import { FontOptions } from './font'
import { IconPreset } from './icons'

export interface GlobalImports {
  components?: string[]
  directives?: string[]
  transitions?: string[]
}

export interface Options {
  automaticImports?: boolean | VuetifyLoaderOptions
  customVariables?: string[]
  defaultAssets?: {
    font?: FontOptions,
    icons?: IconPreset | false
  } | false
  frameworkOptions?: string | Partial<VuetifyPreset>
  globalImports?: GlobalImports
}

export const defaults = {
  automaticImports: true,
  defaultAssets: {
    font: {
      family: 'Roboto'
    },
    icons: 'mdi' as IconPreset
  }
}

export default function initOptions (this: ModuleThis, moduleOptions?: Options): Required<Options> {
  const options = merge.all([
    defaults,
    this.options.vuetify || {},
    moduleOptions || {}
  ]) as Required<Options>

  return options
}
