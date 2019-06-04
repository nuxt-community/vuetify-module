const { resolve } = require('path')
const colors = require('vuetify/es5/util/colors').default

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDIr: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,

  render: {
    resourceHints: false
  },

  modules: [
    require('../..')
  ],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.red
        }
      }
    }
  }
}
