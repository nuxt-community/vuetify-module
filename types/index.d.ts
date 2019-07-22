import { VuetifyObject } from 'vuetify'

// Nuxt >= 2.9
declare module '@nuxt/types' {
  interface Context {
    $vuetify: VuetifyObject
  }
  interface NuxtAppOptions {
    vuetify: VuetifyObject
  }
}

// Nuxt < 2.9
declare module '@nuxt/vue-app' {
  interface Context {
    $vuetify: VuetifyObject
  }
  interface NuxtAppOptions {
    vuetify: VuetifyObject
  }
}

// $vuetify in Vue instances is already defined by Vuetify
