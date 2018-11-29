<template>
  <v-layout wrap align-center justify-center row fill-height>
    <hall-card :halls="halls"></hall-card>
  </v-layout>
</template>

<script>
import HallCard from '@/components/HallCard'
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'Hall',

  computed: {
    ...mapGetters('hall', [
      'halls'
    ])
  },

  methods: {
    ...mapActions('hall', [
      'fetch'
    ])
  },

  created () {
    this.fetch()
  },

  components: {
    HallCard
  }
}
</script>

<style scoped>

</style>
