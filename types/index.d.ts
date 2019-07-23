import { VuetifyObject } from 'vuetify'

declare module '@nuxt/vue-app' {
  interface Context {
    $vuetify: VuetifyObject
  }
}
