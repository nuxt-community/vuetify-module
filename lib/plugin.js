import Vue from 'vue'
<% if (options.treeShake) { %>
import Vuetify from 'vuetify/lib'
<% } else { %>
import Vuetify from 'vuetify'
<% } %>

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify(<%= serializeFunction(options.vuetifyOptions) %>)

  ctx.$vuetify = vuetify
  ctx.app.vuetify = vuetify
}
