const { resolve } = require('path')

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
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#ff0000'
        }
      }
    }
  }
}
