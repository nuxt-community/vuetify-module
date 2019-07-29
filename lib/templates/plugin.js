import Vue from 'vue'
<% if (options.treeShake) { %>
import Vuetify from 'vuetify/lib'
<% } else { %>
import Vuetify from 'vuetify'
<% } %>

import options from './options'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify(options)

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
