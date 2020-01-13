import { ModuleThis } from '@nuxt/types/config/module'

export interface FontOptions {
  family?: string
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

  const sass = this.options.build!.loaders!.sass!

  // Add font-family custom variable (only if not Roboto, cause already default in Vuetify styles)
  if (options.family !== 'Roboto') {
    sass.prependData = [`$body-font-family: '${options.family}', sans-serif`, sass.prependData].join('\n')
  }

  // Add font-size custom variable
  if (options.size) {
    sass.prependData = [`$font-size-root: ${options.size}px`, sass.prependData].join('\n')
  }
}
