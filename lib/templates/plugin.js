import Vue from 'vue'
import Vuetify from '<%= options.treeShake ? 'vuetify/lib' : 'vuetify' %>'
import options from './options'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetifyOptions = typeof options === 'function' ? options(ctx) : options

<% if (options.defaultIconPreset) { %>
  vuetifyOptions.icons = vuetifyOptions.icons || {}
  vuetifyOptions.icons.iconfont = '<%= options.defaultIconPreset %>'
<% } %>

  const vuetify = new Vuetify(vuetifyOptions)

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
