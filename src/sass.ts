import { ModuleThis } from '@nuxt/types/config/module'
import dartSass from 'sass'
import { Options } from './options'

export function prependData (this: ModuleThis, ...datas: string[]) {
  const { sass, scss } = this.options.build!.loaders

  sass.prependData = [sass.prependData, ...datas].join('\n')
  scss.prependData = [scss.prependData, ...datas.map(d => d + ';')].join('\n')
}

export default function setupSass (this: ModuleThis, customVariables: Options['customVariables']) {
  const { sass, scss } = this.options.build!.loaders

  // Use Dart Sass
  sass.implementation = scss.implementation = dartSass

  // Ensure compatibility with Nuxt < 2.10 (i.e. before https://github.com/nuxt/nuxt.js/pull/6460)
  if (!sass.sassOptions) {
    delete sass.indentedSyntax
    sass.sassOptions = {
      indentedSyntax: true
    }
  }

  // Custom variables
  if (customVariables && customVariables.length > 0) {
    prependData.call(this, ...customVariables.map(path => `@import '${path}'`))
  }
}
