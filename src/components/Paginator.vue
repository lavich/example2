<template>
  <div>
    <v-pagination
      :value="page"
      @input="load"
      :length="total_pages"
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Paginator',

  computed: {
    ...mapGetters('concert', [
      'total_pages',
      'page'
    ])
  },

  methods: {
    ...mapActions('concert', [
      'load'
    ])
  },

  created () {
    this.load()
  }

}
</script>

<style scoped>

</style>
