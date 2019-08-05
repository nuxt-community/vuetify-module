const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDIr: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,

  render: {
    resourceHints: false
  },

  modules: [
    [
      require('../..'), {
        customVariables: ['~/assets/variables.scss'],
        optionsPath: './vuetify.options.js'
      }
    ]
  ]
}
