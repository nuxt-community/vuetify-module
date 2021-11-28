import merge from 'deepmerge'

import { SFCDescriptor } from 'vue-template-compiler'
import { UserVuetifyPreset } from 'vuetify/types/services/presets'
import { NuxtOptions } from '@nuxt/types/config'

import { FontOptions } from './font'
import { IconPreset } from './icons'

export interface VuetifyLoaderOptions {
  match?(originalTag: string, context: {
    kebabTag: string,
    camelTag: string,
    path: string,
    component: SFCDescriptor
  }): [string, string] | undefined
}

export interface TreeShakeOptions {
  components?: string[]
  directives?: string[]
  loaderOptions?: VuetifyLoaderOptions
  transitions?: string[]
}

export interface Options extends Omit<UserVuetifyPreset, 'preset'> {
  customVariables?: string[]
  defaultAssets?: {
    font?: FontOptions,
    icons?: IconPreset | false
  } | false
  optionsPath?: string
  preset?: string
  treeShake?: boolean | TreeShakeOptions
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

export default function initOptions (this: { options: NuxtOptions }, moduleOptions?: Options): Required<Options> {
  const options = merge.all([
    defaults,
    this.options.vuetify || {},
    moduleOptions || {}
  ]) as Required<Options>

  return options
}
