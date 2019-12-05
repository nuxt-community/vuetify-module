import { ModuleThis } from '@nuxt/types/config/module'
import { SFCDescriptor } from 'vue-template-compiler'
import { Options } from './options'

// https://github.com/vuetifyjs/vuetify-loader#automatic-imports

export interface VuetifyLoaderOptions {
  match?(originalTag: string, context: {
    kebabTag: string,
    camelTag: string,
    path: string,
    component: SFCDescriptor
  }): Array<[string, string]>
  progressiveImages?: boolean | {
    graphicsMagick?: boolean
    resourceQuery?: RegExp
    sharp?: boolean
    size?: number
  }
}

export default function setupLoader (this: ModuleThis, options: Options['loader']) {
  const VuetifyLoaderPlugin = this.nuxt.resolver.requireModule('vuetify-loader/lib/plugin')

  this.extendBuild((config) => {
    config.plugins!.push(new VuetifyLoaderPlugin(typeof options === 'object' ? options : {}))
  })
}
