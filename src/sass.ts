import { NuxtOptionsBuild } from '@nuxt/types/config/build'
import { Module } from '@nuxt/types/config/module'
import dartSass from 'sass'
import { Options as SassOptions } from 'sass-loader'
import { Options } from './options'

export type SassOptionsV10 = SassOptions & {
  additionalData?: string;
  indentedSyntax?: boolean;
};

const setupSass: Module<Options['customVariables']> = function (
  customVariables
) {
  const { sass, scss }: { sass: SassOptionsV10; scss: SassOptionsV10 } = this
    .options.build!.loaders as Required<
    Pick<NonNullable<NuxtOptionsBuild['loaders']>, 'sass' | 'scss'>
  >

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
    const sassImports = customVariables
      .map(path => `@import '${path}'`)
      .join('\n')
    sass.additionalData = [sass.additionalData, sassImports].join('\n')
    const scssImports = customVariables
      .map(path => `@import '${path}';`)
      .join('\n')
    scss.additionalData = [scss.additionalData, scssImports].join('\n')
  }
}

export default setupSass
