import Vue from 'vue'
import options from './options'
<%
// handle manual imports
const componentImports = typeof options.treeShake === 'object' && Array.isArray(options.treeShake.components)
  ? options.treeShake.components.filter(c => typeof c === 'string')
  : []
const transitionImports = typeof options.treeShake === 'object' && Array.isArray(options.treeShake.transitions)
  ? options.treeShake.transitions.filter(t => typeof t === 'string')
  : []
const directiveImports = typeof options.treeShake === 'object' && Array.isArray(options.treeShake.directives)
  ?  options.treeShake.directives.filter(d => typeof d === 'string')
  : []
const libImports = componentImports.concat(transitionImports)
%>
import Vuetify<% if (libImports.length > 0) { %>, {
  <%= libImports.join(',\n  ') %>
}<% } %> from '<%= options.treeShake ? 'vuetify/lib' : 'vuetify' %>'
<% if (directiveImports.length > 0) { %>
import { directiveImports.join(', ') } from 'vuetify/lib/directives'
<% } %>

Vue.use(Vuetify<% if (componentImports.length > 0 || transitionImports.length > 0 || directiveImports.length > 0) { %>, {
  <%
  const vuetifyUseOptions = []
  if (componentImports.length > 0) {
    vuetifyUseOptions.push('components: { ' + componentImports.join(', ') + ' }')
  }
  if (directiveImports.length > 0) {
    vuetifyUseOptions.push('directives: { ' + directiveImports.join(', ') + ' }')
  }
  if (transitionImports.length > 0) {
    vuetifyUseOptions.push('transitions: { ' + transitionImports.join(', ') + ' }')
  }
  print(vuetifyUseOptions.join(',\n  '))
  %>
}<% } %>)

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
