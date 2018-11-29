<template>
  <v-navigation-drawer app
                       permanent
                       :mini-variant.sync="mini"
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile @click.stop="mini = !mini">
          <v-tooltip right>
            <v-list-tile-action slot="activator">
              <v-icon color="primary">menu</v-icon>
            </v-list-tile-action>
            <span>Показать меню</span>
          </v-tooltip>

          <v-list-tile-content>
            <v-list-tile-title>Меню</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0">
      <v-list-tile v-for="item in items"
                   :key="item.text"
                   @click.stop="$router.push(item.url)"
                   v-if="!(item.url === '/admin' && !isAdmin)">
        <v-tooltip right>
          <v-list-tile-action slot="activator">
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <span>{{ item.title }}</span>
        </v-tooltip>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'NavigationDrawer',

  data () {
    return {
      mini: true,
      items: [
        { icon: 'home', title: 'Главная', url: '/dashboard' },
        { icon: 'videocam', title: 'Трансляции', url: '/concert' },
        { icon: 'settings', title: 'Настройки', url: '/admin' }
      ]
    }
  },

  computed: {
    ...mapGetters('user', [
      'isAdmin'
    ])
  }
}
</script>

<style scoped>

</style>
