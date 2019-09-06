import path from 'path'
import { Configuration } from '@nuxt/types'
import typescriptModule from '@nuxt/typescript-build'
import vuetifyModule from '../../src'

const config: Partial<Configuration> = {
  rootDir: path.resolve(__dirname, '../..'),
  buildDIr: path.resolve(__dirname, '.nuxt'),
  srcDir: __dirname,

  buildModules: [typescriptModule, vuetifyModule],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.ts'
  }
}

export default config
