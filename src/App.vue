<template>
  <v-app>

    <div v-show="$route.path !== '/login'">
      <navigation-drawer></navigation-drawer>
      <toolbar></toolbar>
    </div>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <snack></snack>

  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import NavigationDrawer from '@/components/NavigationDrawer'
import Toolbar from '@/components/Toolbar'
import Snack from '@/components/Snack'

export default {
  name: 'App',

  methods: {
    ...mapActions('hall', {
      fetchHall: 'fetch'
    })
  },

  components: {
    NavigationDrawer,
    Snack,
    Toolbar
  },

  created () {
    this.fetchHall()
  }
}
</script>

<style>

</style>
