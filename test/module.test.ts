import { Nuxt } from '@nuxt/core-edge'
import { Builder } from '@nuxt/builder-edge'
import { BundleBuilder } from '@nuxt/webpack-edge'
import { Configuration } from '@nuxt/types'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

import vuetifyModule, { VuetifyLoaderOptions } from '../src'

jest.setTimeout(60000)
jest.mock('vuetify-loader/lib/plugin')

const buildWithVuetifyModule = async (config: Partial<Configuration> = {}) => {
  const nuxt = new Nuxt({
    buildModules: [vuetifyModule],
    ...config
  } as Configuration)

  try {
    await nuxt.ready()
    await new Builder(nuxt, BundleBuilder).build()
  } catch (err) {

  }

  return nuxt
}

describe('module', () => {
  let nuxt

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('with default options', async () => {
    nuxt = await buildWithVuetifyModule({
      dir: {
        app: ''
      }
    })

    expect(nuxt.options.head.link).toHaveLength(2)
    expect(nuxt.options.build.templates).toHaveLength(2)
    expect(nuxt.options.build.templates.map(t => t.dst)).toEqual(['vuetify/options.js', 'vuetify/plugin.js'])
  })

  test('without defaultAssets', async () => {
    nuxt = await buildWithVuetifyModule({
      vuetify: {
        defaultAssets: false
      }
    })

    expect(nuxt.options.head.link).toHaveLength(0)
  })

  test('with customVariables', async () => {
    nuxt = await buildWithVuetifyModule({
      vuetify: {
        customVariables: ['/path/to/variables.scss']
      }
    })

    expect(nuxt.options.build.loaders.sass.prependData).toEqual("@import '/path/to/variables.scss'")
  })

  test('with customVariables (with existing prependData)', async () => {
    nuxt = await buildWithVuetifyModule({
      build: {
        loaders: {
          sass: {
            prependData: '$someVariable: #000000'
          }
        }
      },
      vuetify: {
        customVariables: ['/path/to/variables.scss']
      }
    })

    expect(nuxt.options.build.loaders.sass.prependData).toEqual("$someVariable: #000000\n@import '/path/to/variables.scss'")
  })

  test('with optionsPath', async () => {
    nuxt = await buildWithVuetifyModule({
      vuetify: {
        optionsPath: 'test/fixture/vuetify.options.ts'
      }
    })

    expect(nuxt.options.build.templates.map(t => t.dst)).toContain('vuetify/options.ts')
  })

  test('with treeShake', async () => {
    nuxt = await buildWithVuetifyModule({
      vuetify: {
        treeShake: true
      }
    })

    expect(nuxt.options.build.transpile).toContain('vuetify/lib')
    expect(VuetifyLoaderPlugin).toHaveBeenCalledTimes(2) // client (1) + server (1) = (2)
  })

  test('with treeShake (and loaderOptions)', async () => {
    const loaderOptions: VuetifyLoaderOptions = {
      match () {
        return []
      }
    }

    nuxt = await buildWithVuetifyModule({
      vuetify: {
        treeShake: {
          loaderOptions
        }
      }
    })

    expect(VuetifyLoaderPlugin).toHaveBeenNthCalledWith(2, loaderOptions)
  })
})
