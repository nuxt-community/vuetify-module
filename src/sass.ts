import { ModuleThis } from '@nuxt/types/config/module'
import dartSass from 'sass'
import { Options } from './options'

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
    const imports = customVariables.map(path => `@import '${path}'`).join('\n')
    sass.prependData = [sass.prependData, imports].join('\n')
  }
}
