<template>
  <v-toolbar fixed app>
    <v-toolbar-title>
      Филармония
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-tooltip bottom>
        <v-btn flat
               @click="logout"
               slot="activator">
          {{ username }}
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
        <span>Выйти</span>
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'Toolbar',

  computed: {
    ...mapGetters('user', [
      'username'
    ])
  },

  methods: {
    ...mapActions('auth', {
      authLogout: 'logout'
    }),
    logout: function () {
      this.authLogout()
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style scoped>

</style>
