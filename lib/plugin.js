import Vue from 'vue'
import Vuetify from '<%= options.treeShake ? 'vuetify/lib' : 'vuetify' %>'

Vue.use(Vuetify)

const options = <%= serializeFunction(options.vuetifyOptions) %>

<% if (options.defaultIconPreset) { %>
options.icons = options.icons || {}
options.icons.iconfont = '<%= options.defaultIconPreset %>'
<% } %>

export default (ctx) => {
  const vuetify = new Vuetify(options)

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
