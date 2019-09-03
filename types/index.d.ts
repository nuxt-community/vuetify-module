import { Framework } from 'vuetify'

declare module '@nuxt/vue-app' {
  interface Context {
    $vuetify: Framework
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $vuetify: Framework
  }
}
