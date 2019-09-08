import merge from 'deepmerge'

import { SFCDescriptor } from 'vue-template-compiler'
import { VuetifyPreset } from 'vuetify/types/presets'
import { ModuleThis } from '@nuxt/types/config/module'

import { FontOptions } from './font'
import { IconPreset } from './icons'

export interface VuetifyLoaderOptions {
  match?(originalTag: string, context: {
    kebabTag: string,
    camelTag: string,
    path: string,
    component: SFCDescriptor
  }): Array<[string, string]>
}

export interface Options extends Partial<VuetifyPreset> {
  customVariables?: string[]
  defaultAssets?: {
    font?: FontOptions,
    icons?: IconPreset | false
  } | false
  optionsPath?: string
  treeShake?: boolean | {
    loaderOptions?: VuetifyLoaderOptions
  }
}

export const defaults = {
  customVariables: [],
  defaultAssets: {
    font: {
      family: 'Roboto'
    },
    icons: 'mdi' as IconPreset
  },
  optionsPath: undefined,
  treeShake: process.env.NODE_ENV === 'production'
}

export default function initOptions (this: ModuleThis, moduleOptions?: Options): Required<Options> {
  const options = merge.all([
    defaults,
    this.options.vuetify || {},
    moduleOptions || {}
  ]) as Required<Options>

  return options
}
