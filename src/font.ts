import { ModuleThis } from '@nuxt/types/config/module'
import { prependData as sassPrependData } from './sass'

export interface FontOptions {
  family?: string | string[]
  size?: number
}

export default function setupFont (this: ModuleThis, options: FontOptions) {
  const family = `${options.family}:100,300,400,500,700,900&display=swap`

  if (this.options.modules!.some(mod => mod === 'nuxt-webfontloader')) {
    this.options.webfontloader = this.options.webfontloader || {}
    this.options.webfontloader.google = this.options.webfontloader.google || {}
    this.options.webfontloader.google.families = [...this.options.webfontloader.google.families || [], family]
  } else {
    this.options.head!.link!.push({
      rel: 'stylesheet',
      type: 'text/css',
      href: `https://fonts.googleapis.com/css?family=${family}`
    })
  }

  // Add font-family custom variable (only if not Roboto, cause already default in Vuetify styles)
  if (options.family !== 'Roboto') {
    const userFontFamily = Array.isArray(options.family)
      ? options.family.map(x => `'${x}'`).join(', ')
      : `'${options.family}'`
    sassPrependData.call(this, `$body-font-family: ${userFontFamily}, sans-serif`)
  }

  // Add font-size custom variable
  options.size && sassPrependData.call(this, `$font-size-root: ${options.size}px`)
}
