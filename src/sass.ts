import { ModuleThis } from '@nuxt/types/config/module'
import dartSass from 'sass'
import { Options } from './options'

export default function setupSass (this: ModuleThis, options: Pick<Options, 'customVariables'>) {
  // Ensure sass-loader@8 compatibility (https://github.com/webpack-contrib/sass-loader/releases/tag/v8.0.0)
  // Cause since loader options validation, this will fail: https://github.com/nuxt/nuxt.js/tree/c8ee9a660809e856c28d8678c6a632bbdd6ed00f/packages/config/src/config/build.js#L50
  delete this.options.build!.loaders.sass.indentedSyntax

  // Use Dart Sass
  this.options.build!.loaders.sass.implementation =
    this.options.build!.loaders.scss.implementation =
      dartSass

  // Ensure it uses indented syntax for Sass files
  this.options.build!.loaders.sass.sassOptions = this.options.build!.loaders.sass.sassOptions || {}
  this.options.build!.loaders.sass.sassOptions.indentedSyntax = true

  // Custom variables
  if (options.customVariables && options.customVariables.length > 0) {
    const imports = options.customVariables.map(path => `@import '${path}'`).join('\n')
    this.options.build!.loaders.sass.prependData = [this.options.build!.loaders.sass.prependData, imports].join('\n')
  }
}
