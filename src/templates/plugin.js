import Vue from 'vue'
import Vuetify from '<%= options.treeShake ? 'vuetify/lib' : 'vuetify' %>'
<%
const libImports = [
  { key: 'components', location: 'vuetify/lib'},
  { key: 'transitions', location: 'vuetify/lib'},
  { key: 'directives', location: 'vuetify/lib/directives'}
]
if (options.treeShake) {
  for (const lib of libImports) {
    if (options.treeShake[lib.key] && options.treeShake[lib.key].length > 0) {
%>
import { <%= options.treeShake[lib.key].join(', ') %> } from '<%= lib.location %>'
  <%
    }
  }
}
%>

import options from './options'

Vue.use(Vuetify, {
<% if (options.treeShake) { %>
<%= libImports.filter(lib => options.treeShake[lib.key] && options.treeShake[lib.key].length > 0)
      .map(lib => `  ${lib.key}: { ${options.treeShake[lib.key].join(', ')} }`)
      .join(',\n') %>
<% } %>
})

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
