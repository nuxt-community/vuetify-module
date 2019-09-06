import { Nuxt } from '@nuxt/core-edge'
import { Builder } from '@nuxt/builder-edge'
import { BundleBuilder } from '@nuxt/webpack-edge'
import { Configuration } from '@nuxt/types'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import consola from 'consola'

import vuetifyModule from '../src'

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

  test('with default options', async () => {
    nuxt = await buildWithVuetifyModule()

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

  test('defaultAssets.icons wrong value', async () => {
    const consolaWarnSpy = jest.spyOn(consola, 'warn')

    nuxt = await buildWithVuetifyModule({
      vuetify: {
        // @ts-ignore
        defaultAssets: {
          icons: 'wrong'
        }
      }
    })

    expect(consolaWarnSpy).toHaveBeenCalledWith("[@nuxtjs/vuetify] Value `'wrong'` for `defaultAssets.icons` option is not supported (Supported values : `'mdi'`, `'md'`, `'fa'`, `'fa4'`, `false`)")
  })

  test('with customVariables', async () => {
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

    expect(nuxt.options.build.loaders.sass.prependData).toContain("@import '/path/to/variables.scss'")
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
})
