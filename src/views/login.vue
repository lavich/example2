<template>
  <v-layout align-center justify-center column fill-height>
    <login-card
      @submit="login"
      :error="error"
    ></login-card>
  </v-layout>
</template>

<script>
import LoginCard from '@/components/LoginCard'
import { mapActions } from 'vuex'

export default {

  name: 'login',

  data () {
    return {
      error: false
    }
  },

  methods: {
    ...mapActions('auth', [
      'auth'
    ]),
    ...mapActions('user', [
      'status'
    ]),
    login (data) {
      const { username, password, rememberMe } = data
      this.auth({ username, password, rememberMe })
        .then(this.status)
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          this.error = true
        })
    }
  },

  components: {
    LoginCard
  }
}
</script>

<style scoped>

</style>
