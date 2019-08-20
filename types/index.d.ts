import { VuetifyObject } from 'vuetify'

declare module '@nuxt/vue-app' {
  interface Context {
    $vuetify: VuetifyObject
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $vuetify: VuetifyObject
  }
}
