<template>
  <v-card>
    <v-card-title>
      <v-select
        v-model="selectedHallId"
        :items="halls"
        item-text="name"
        item-value="id"
      >
        <p slot="no-data" class="pl-2">Нет данных о залах</p>
      </v-select>
    </v-card-title>

    <v-responsive :aspect-ratio="16/9" max-width="640">
      <clappr :src="source" :width="640"></clappr>
    </v-responsive>

    <v-card-actions>
      <v-btn :class="{primary: !selectedPlayer}" block flat
             @click="selectedPlayer = false">
        Камера
      </v-btn>
      <v-btn :class="{primary: selectedPlayer}" block flat
             @click="selectedPlayer = true">
        Плеер
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <a :href="source" target="_blank">{{source}}</a>
    </v-card-text>
  </v-card>
</template>

<script>
import Clappr from '@/components/Clappr'

export default {

  name: 'HallCard',

  props: {
    halls: {
      type: Array
    }
  },

  data () {
    return {
      selectedHallId: 0,
      selectedPlayer: true
    }
  },

  computed: {
    source () {
      if (!this.halls[this.selectedHallId]) {
        return ''
      }
      return this.selectedPlayer
        ? this.halls[this.selectedHallId].target_source
        : this.halls[this.selectedHallId].origin_source
    }
  },

  components: {
    Clappr
  }
}
</script>

<style scoped>

</style>
