import { Module } from '@nuxt/types/config/module'

import type { SassOptionsV10 } from './sass'

export interface FontOptions {
  family?: string | string[]
  size?: number
}

const setupFont: Module<FontOptions> = function (options) {
  const family = `${options.family}:100,300,400,500,700,900&display=swap`

  /* istanbul ignore else */
  if (this.options.modules!.includes('nuxt-webfontloader')) {
    this.options.webfontloader = this.options.webfontloader || {}
    this.options.webfontloader.google = this.options.webfontloader.google || {}
    this.options.webfontloader.google.families = [...this.options.webfontloader.google.families || [], family]
  } else if (typeof this.options.head === 'object') {
    this.options.head.link!.push({
      rel: 'stylesheet',
      type: 'text/css',
      href: `https://fonts.googleapis.com/css?family=${family}`
    })
  }

  const sass : SassOptionsV10 = this.options.build!.loaders!.sass!

  // Add font-family custom variable (only if not Roboto, cause already default in Vuetify styles)
  if (options.family !== 'Roboto') {
    const userFontFamily = Array.isArray(options.family)
      ? options.family.map(x => `'${x}'`).join(', ')
      : `'${options.family}'`
    sass.additionalData = [`$body-font-family: ${userFontFamily}, sans-serif`, sass.additionalData].join('\n')
  }

  // Add font-size custom variable
  if (options.size) {
    sass.additionalData = [`$font-size-root: ${options.size}px`, sass.additionalData].join('\n')
  }
}

export default setupFont
