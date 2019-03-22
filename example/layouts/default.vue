<template>
  <div id="app">
    <v-app
      id="inspire"
      dark
    >
      <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        app
      >
        <v-list dense>
          <v-list-tile v-for="item in items" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-tile>
          <v-subheader class="mt-3 grey--text text--darken-1">
            SUBSCRIPTIONS
          </v-subheader>
          <v-list>
            <v-list-tile v-for="item in items2" :key="item.text">
              <v-list-tile-avatar>
                <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
              </v-list-tile-avatar>
              <v-list-item-title v-text="item.text" />
            </v-list-tile>
          </v-list>
          <v-list-tile class="mt-3">
            <v-list-tile-action>
              <v-icon color="grey darken-1">
                add_circle_outline
              </v-icon>
            </v-list-tile-action>
            <v-list-item-title class="grey--text text--darken-1">
              Browse Channels
            </v-list-item-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="grey darken-1">
                settings
              </v-icon>
            </v-list-tile-action>
            <v-list-item-title class="grey--text text--darken-1">
              Manage Subscriptions
            </v-list-item-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        color="red"
        dense
        fixed
        clipped-left
        app
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-icon class="mx-3">
          fa-youtube
        </v-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">Youtube</span>
        </v-toolbar-title>
        <v-spacer />
        <v-layout row align-center style="max-width: 650px">
          <v-text-field
            placeholder="Search..."
            single-line
            append-icon="search"
            color="white"
            hide-details
          />
        </v-layout>
      </v-app-bar>
      <v-content>
        </Nuxt>
      </v-content>
    </v-app>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
        { icon: 'featured_play_list', text: 'Playlists' },
        { icon: 'watch_later', text: 'Watch Later' }
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' }
      ]
    }
  }
}
</script>
