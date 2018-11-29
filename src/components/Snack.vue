<template>
  <v-snackbar
    top right
    color="primary"
    :value="true"
    v-if="error"
    @input="closeSnack"
    @click="closeSnack"
  >
    {{ error }}
    <v-btn flat @click="closeSnack"><v-icon dark>close</v-icon></v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Snack',
  computed: {
    ...mapGetters('common', [
      'error'
    ])
  },
  methods: {
    ...mapActions('common', {
      closeSnack: 'clearError'
    })
  }
}
</script>

<style scoped>

</style>
