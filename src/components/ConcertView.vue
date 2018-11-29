<template>
  <v-card class="pa-1">
    <v-layout row wrap>
      <v-responsive :aspect-ratio="16/9" max-width="160">
        <v-flex xs2>
          <div v-if="pc_rec_url && before(end)">
            <clappr :src="pc_rec_url"></clappr>
          </div>
          <div v-else>
            <v-img
              :src="'/hall_' + hall_id + '.jpg'"
              width="160" height="90"
              class="grey lighten-2"
            >
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate
                                     color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </v-img>
          </div>
        </v-flex>
      </v-responsive>
      <v-flex xs4 class="ma-1">
        <div class="title">
          <a @click="$emit('goto', id)">{{ title }}</a>
        </div>
        <div>{{ hall }}</div>
        <div v-if="is_geo_limitation">Трансляция только для России</div>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs3 class="text-lg-right ma-1">
        <div>{{ start | moment('D MMMM') }}</div>
        <div>{{ start | moment('dddd') }}</div>
        <div>{{ start | moment('HH:mm') }} - {{ end | moment('HH:mm') }}</div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Clappr from '@/components/Clappr'

let getDate = () => {
  var date = new Date()
  return new Date(
    date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
}
export default {
  name: 'ConcertView',

  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    hall_id: {
      type: Number,
      default: 0
    },
    start: {
      type: String,
      default: getDate().slice(0, 23)
    },
    end: {
      type: String,
      default: getDate().slice(0, 23)
    },
    is_geo_limitation: {
      type: Boolean,
      default: false
    },
    pc_rec_url: {
      type: String,
      default: ''
    },
    hall: {
      type: String,
      default: ''
    }
  },

  methods: {
    before (date) {
      return date < new Date(new Date().getTime() -
        (new Date().getTimezoneOffset() * 60000)).toISOString()
    }
  },

  components: {
    Clappr
  }
}
</script>

<style scoped>

</style>
