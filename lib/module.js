const path = require('path')
const fs = require('fs')
const consola = require('consola')
const merge = require('deepmerge')

const defaults = {
  customVariables: [],
  defaultAssets: {
    font: true,
    icons: 'mdi'
  },
  optionsPath: undefined,
  treeShake: process.env.NODE_ENV === 'production'
}

const cdn = {
  'mdi': 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  'md': 'https://fonts.googleapis.com/css?family=Material+Icons',
  'fa': 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css',
  'fa4': 'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css'
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

    const defaultIconPreset = options.defaultAssets.icons

    // Add Icons font
    if (defaultIconPreset) {
      if (cdn[defaultIconPreset]) {
        this.options.head.link.push({
          rel: 'stylesheet',
          type: 'text/css',
          href: cdn[defaultIconPreset]
        })
      } else {
        const wrapValue = val => typeof val === 'string' ? `\`'${val}'\`` : `\`${val}\``
        const supportedValues = [...Object.keys(cdn), false].map(wrapValue)
        consola.warn(`[@nuxtjs/vuetify] Value ${wrapValue(defaultIconPreset)} for \`defaultAssets.icons\` option is not supported (Supported values : ${supportedValues.join(', ')})`)
      }
    }

    // Enable tree-shaking with VuetifyLoader (https://github.com/vuetifyjs/vuetify-loader)
    if (options.treeShake) {
      const VuetifyLoader = this.nuxt.resolver.requireModule('vuetify-loader/lib/plugin')

      this.options.build.transpile.push('vuetify/lib')

      this.extendBuild((config) => {
        config.plugins.push(new VuetifyLoader())
      })
    }

    // Remove module options
    const vuetifyOptions = { ...options }
    delete vuetifyOptions.customVariables
    delete vuetifyOptions.defaultAssets
    delete vuetifyOptions.optionsPath
    delete vuetifyOptions.treeShake

    const optionsPath = this.nuxt.resolver.resolveAlias(options.optionsPath ||
      path.join(this.options.dir.app || 'app', 'vuetify', 'options.js'))

    // Register options template
    this.addTemplate({
      fileName: 'vuetify/options.js',
      src: fs.existsSync(optionsPath) ? optionsPath : path.join(__dirname, 'templates/options.js'),
      options: vuetifyOptions
    })

    // Register plugin
    this.addPlugin({
      fileName: 'vuetify/plugin.js',
      src: path.resolve(__dirname, 'templates/plugin.js'),
      options: {
        defaultIconPreset,
        treeShake: options.treeShake
      }
    })
  })
}

module.exports.meta = require('../package.json')
