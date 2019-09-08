import merge from 'deepmerge'

import { SFCDescriptor } from 'vue-template-compiler'
import { VuetifyPreset } from 'vuetify/types/presets'
import { ModuleThis } from '@nuxt/types/config/module'

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
    font?: string | false,
    icons?: IconPreset | false
  } | false
  optionsPath?: string
  treeShake?: boolean | {
    loaderOptions?: VuetifyLoaderOptions
  }
}

const defaults: Options = {
  customVariables: [],
  defaultAssets: {
    font: 'Roboto',
    icons: 'mdi'
  },
  optionsPath: undefined,
  treeShake: process.env.NODE_ENV === 'production'
}

export default function initOptions (this: ModuleThis, moduleOptions?: Options): Required<Options> {
  const options = merge.all([
    defaults,
    this.options.vuetify || {},
    moduleOptions!
  ]) as Required<Options>

  return options
}
