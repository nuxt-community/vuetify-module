const path = require('path')
const merge = require('deepmerge')

const defaults = {
  customVariables: [],
  defaultAssets: {
    font: true,
    icons: true
  },
  treeShake: process.env.NODE_ENV === 'production'
}

// See https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0-alpha.12
const sassLoaderOptions = {
  implementation: require('sass'),
  fiber: require('fibers')
}

module.exports = function (moduleOptions) {
  this.nuxt.hook('build:before', () => {
    const options = merge.all([
      defaults,
      this.options.vuetify || {},
      moduleOptions
    ])

    // User can disable all default assets with `defaultAssets: false`
    if (options.defaultAssets === false) {
      options.defaultAssets = {
        font: false,
        icons: false
      }
    }

    // Customize sass-loader options
    Object.assign(this.options.build.loaders.scss, sassLoaderOptions)
    Object.assign(this.options.build.loaders.sass, sassLoaderOptions)

    // Custom variables
    const sassLoaderData = this.options.build.loaders.sass.data
    if (options.customVariables.length > 0 && typeof sassLoaderData !== 'function') {
      const imports = options.customVariables.map(path => `@import '${path}'`).join('\n')
      this.options.build.loaders.sass.data = sassLoaderData ? sassLoaderData.concat('\n', imports) : imports
    }

    // Add styles
    if (options.treeShake) {
      this.options.css.push('vuetify/src/styles/main.sass')
    } else {
      this.options.css.push('vuetify/dist/vuetify.css')
    }

    // Add Roboto font
    if (options.defaultAssets.font) {
      this.options.head.link.push({
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'
      })
    }

    // Add Material Design Icons font
    if (options.defaultAssets.icons) {
      this.options.head.link.push({
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css'
      })
    }

    // Enable tree-shaking with VuetifyLoader (https://github.com/vuetifyjs/vuetify-loader)
    if (options.treeShake) {
      const VuetifyLoader = this.nuxt.resolver.requireModule('vuetify-loader/lib/plugin')

      this.options.build.transpile.push(/^vuetify/)

      this.extendBuild((config) => {
        config.plugins.push(new VuetifyLoader())
      })
    }

    // Remove module options
    const vuetifyOptions = { ...options }
    delete vuetifyOptions.customVariables
    delete vuetifyOptions.defaultAssets
    delete vuetifyOptions.treeShake

    // Register plugin
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.js'),
      fileName: 'vuetify.js',
      options: {
        vuetifyOptions,
        treeShake: options.treeShake
      }
    })
  })
}

module.exports.meta = require('../package.json')
