import Vue from 'vue'
<% if (options.treeShake) { %>
import Vuetify from 'vuetify/lib'
<% } else { %>
import Vuetify from 'vuetify'
<% } %>

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify(<%= JSON.stringify(options.vuetifyOptions, null, 2) %>)

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
