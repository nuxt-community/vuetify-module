import Vue from 'vue'
import Vue from 'vuetify/lib'
<% if (options.preset) { %>
import { preset } from '<%= options.preset %>'
<% } %>

<%
const libImports = [
  { key: 'components', location: 'vuetify/lib'},
  { key: 'transitions', location: 'vuetify/lib'},
  { key: 'directives', location: 'vuetify/lib/directives'}
]
if (options.globalImports) {
  for (const lib of libImports) {
    if (options.globalImports[lib.key] && options.globalImports[lib.key].length > 0) {
%>
import { <%= options.globalImports[lib.key].join(', ') %> } from '<%= lib.location %>'
  <%
    }
  }
}
%>

import options from './options'

Vue.use(Vuetify, {
<% if (options.globalImports) { %>
<%= libImports.filter(lib => options.globalImports[lib.key] && options.globalImports[lib.key].length > 0)
      .map(lib => `  ${lib.key}: { ${options.globalImports[lib.key].join(', ')} }`)
      .join(',\n') %>
<% } %>
})

export default (ctx) => {
  const vuetifyOptions = typeof options === 'function' ? options(ctx) : options

<% if (options.defaultIconPreset) { %>
  vuetifyOptions.icons = vuetifyOptions.icons || {}
  vuetifyOptions.icons.iconfont = '<%= options.defaultIconPreset %>'
<% } %>
<% if (options.preset) { %>
  vuetifyOptions.preset = preset
<% } %>

  const vuetify = new Vuetify(vuetifyOptions)

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
