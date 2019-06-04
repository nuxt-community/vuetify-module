const path = require('path')
const merge = require('deepmerge')

const defaults = {
  assets: {
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

    // User can disable all assets with ``
    if (options.assets === false) {
      options.assets = {
        font: false,
        icons: false
      }
    }

    // Customize sass-loader options
    Object.assign(this.options.build.loaders.sass, sassLoaderOptions)
    Object.assign(this.options.build.loaders.scss, sassLoaderOptions)

    // Add styles
    if (options.treeShake) {
      this.options.css.push('vuetify/src/styles/main.sass')
    } else {
      this.options.css.push('vuetify/dist/vuetify.css')
    }

    // Add Roboto font
    if (options.assets.font) {
      this.options.head.link.push({
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'
      })
    }

    // Add Material Design Icons font
    if (options.assets.icons) {
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
    delete vuetifyOptions.assets
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
