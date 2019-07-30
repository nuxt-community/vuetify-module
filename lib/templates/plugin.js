import Vue from 'vue'
import Vuetify from '<%= options.treeShake ? 'vuetify/lib' : 'vuetify' %>'
import options from './options'

Vue.use(Vuetify)

<% if (options.defaultIconPreset) { %>
options.icons = options.icons || {}
options.icons.iconfont = '<%= options.defaultIconPreset %>'
<% } %>

export default (ctx) => {
  const vuetify = new Vuetify(options)

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
