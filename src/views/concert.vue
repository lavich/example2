<template>
  <v-layout align-center justify-center fill-height>
    <concert-card
      :id="Number(id)"
      @cancel="$router.go(-1)"></concert-card>
  </v-layout>
</template>

<script>
import ConcertCard from '@/components/ConcertCard'

export default {

  name: 'Concert',

  props: {
    id: {
      type: String,
      default: '0'
    }
  },

  components: {
    ConcertCard
  },

}
</script>

<style scoped>

</style>
