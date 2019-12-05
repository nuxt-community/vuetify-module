import { Nuxt } from '@nuxt/core-edge'
import dartSass from 'sass'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

import _vuetifyModule from '../src'
import _initOptions, { defaults as defaultOptions, Options } from '../src/options'
import _setupLoader, { VuetifyLoaderOptions } from '../src/loader'
import _setupFont, { FontOptions } from '../src/font'
import _setupIcons, { IconPreset } from '../src/icons'
import _setupPlugin from '../src/plugin'
import _setupSass from '../src/sass'

jest.mock('vuetify-loader/lib/plugin')

let nuxt

const vuetifyModule = async (options?: Options) => {
  _vuetifyModule.call(nuxt.moduleContainer, options)
  await nuxt.callHook('build:before')
}
const initOptions = (options?: Options): Required<Options> => _initOptions.call(nuxt.moduleContainer, options)
const setupLoader = (options?: Options['loader']) => {
  _setupLoader.call(nuxt.moduleContainer, options)
  nuxt.options.build.extend && nuxt.options.build.extend({ plugins: [] })
}
const setupFont = (options?: FontOptions) => _setupFont.call(nuxt.moduleContainer, options)
const setupIcons = (preset?: IconPreset) => _setupIcons.call(nuxt.moduleContainer, preset)
const setupPlugin = (options?: Options) => _setupPlugin.call(nuxt.moduleContainer, options)
const setupSass = (customVariables?: Options['customVariables']) => _setupSass.call(nuxt.moduleContainer, customVariables)

beforeEach(async () => {
  nuxt = new Nuxt()
  await nuxt.ready()
})

describe('initOptions', () => {
  test('default', () => {
    const options = initOptions()

    expect(options).toEqual(defaultOptions)
  })
})

describe('setupSass', () => {
  test('default', () => {
    delete nuxt.options.build.loaders.sass.sassOptions

    setupSass()

    const { sass, scss } = nuxt.options.build.loaders

    expect(sass.implementation).toEqual(dartSass)
    expect(scss.implementation).toEqual(dartSass)

    expect(sass.indentedSyntax).toBeUndefined()
    expect(sass.sassOptions.indentedSyntax).toBe(true)
  })

  test('customVariables', () => {
    setupSass(['/path/to/variables.scss'])

    const { sass, scss } = nuxt.options.build.loaders

    expect(sass.prependData).toContain("@import '/path/to/variables.scss'")
    expect(scss.prependData).toContain("@import '/path/to/variables.scss';")
  })
})

describe('setupFont', () => {
  test('default', () => {
    setupFont(defaultOptions.defaultAssets.font)

    expect(nuxt.options.head.link).toContainEqual({
      rel: 'stylesheet',
      type: 'text/css',
      href: `https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap`
    })
  })

  test('with nuxt-webfontloader', () => {
    nuxt.options.modules = ['nuxt-webfontloader']

    setupFont({
      family: 'Montserrat',
      size: 20 }
    )

    expect(nuxt.options.webfontloader).toEqual({
      google: {
        families: ['Montserrat:100,300,400,500,700,900&display=swap']
      }
    })

    const { sass, scss } = nuxt.options.build.loaders

    expect(sass.prependData).toContain("$body-font-family: 'Montserrat', sans-serif")
    expect(scss.prependData).toContain("$body-font-family: 'Montserrat', sans-serif;")

    expect(sass.prependData).toContain('$font-size-root: 20px')
    expect(scss.prependData).toContain('$font-size-root: 20px;')
  })
})

describe('setupIcons', () => {
  test('default', () => {
    setupIcons(defaultOptions.defaultAssets.icons)

    expect(nuxt.options.head.link).toContainEqual({
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
    })
  })
})

describe('setupLoader', () => {
  test('default', () => {
    setupLoader(true)

    expect(VuetifyLoaderPlugin).toHaveBeenCalled()
  })

  test('with options', () => {
    const options: VuetifyLoaderOptions = {
      match () {
        return []
      },
      progressiveImages: {
        resourceQuery: /lazy\?vuetify-preload/
      }
    }

    setupLoader(options)

    expect(VuetifyLoaderPlugin).toHaveBeenCalledWith(options)
  })
})

describe('setupPlugin', () => {
  test('default', () => {
    nuxt.options.dir.app = ''

    setupPlugin(defaultOptions)

    expect(nuxt.options.build.transpile).toContain('vuetify/lib')

    expect(nuxt.options.build.templates.map(t => t.dst)).toEqual(['vuetify/options.js', 'vuetify/plugin.js'])
  })

  test('frameworkOptions', () => {
    setupPlugin({
      ...defaultOptions,
      frameworkOptions: 'test/fixture/vuetify.options.ts'
    })

    expect(nuxt.options.build.templates.map(t => t.dst)).toContain('vuetify/options.ts')
  })
})

describe('module', () => {
  test('default', async () => {
    await vuetifyModule(defaultOptions)
  })

  test('without defaultAssets', async () => {
    await vuetifyModule({
      ...defaultOptions,
      defaultAssets: false
    })
  })
})
