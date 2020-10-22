import { NuxtOptionsLoaders } from '@nuxt/types/config/build'
import { ModuleThis } from '@nuxt/types/config/module'
import dartSass from 'sass'
import { Options } from './options'

export default function setupSass (this: ModuleThis, customVariables: Options['customVariables']) {
  const { sass, scss } = this.options.build!.loaders as Required<Pick<NuxtOptionsLoaders, 'sass' | 'scss'>>

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
    const sassImports = customVariables.map(path => `@import '${path}'`).join('\n')
    sass.prependData = [sass.prependData, sassImports].join('\n')
    const scssImports = customVariables.map(path => `@import '${path}';`).join('\n')
    scss.prependData = [scss.prependData, scssImports].join('\n')
  }
}
