<template>
  <v-card>
    <v-card-title class="title primary--text">
      Фильтр
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>

      <v-text-field
        label="Название концерта"
        placeholder="Поиск по названию"
        clearable
        browser-autocomplete
        v-model="searchName"
      ></v-text-field>
      <v-divider></v-divider>

      <v-checkbox
        v-for="hall in halls"
        :key="hall.id"
        multiple hide-details
        v-model="selectedHalls"
        :label="hall.name"
        :value="hall.id"
      ></v-checkbox>
      <v-divider class="mt-3"></v-divider>

      <v-switch label="Скрыть прошедшие" v-model="hideExpired"></v-switch>
      <v-divider></v-divider>

      <date-time-picker v-model="lowerTime" :disabled="!hideLower">
        <v-checkbox label="Скрыть концерты раньше указанной даты"
                    v-model="hideLower" hide-details
        ></v-checkbox>
      </date-time-picker>
      <v-divider></v-divider>

      <date-time-picker v-model="higherTime" :disabled="!hideHigher">
        <v-checkbox label="Скрыть концерты позднее указанной даты"
                    v-model="hideHigher" hide-details
        ></v-checkbox>
      </date-time-picker>

    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateTimePicker from '@/components/DateTimePicker'

export default {

  name: 'ConcertFilter',

  data () {
    return {
      searchName: '',
      hideExpired: false,
      hideLower: false,
      hideHigher: false,
      lowerTime: new Date(),
      higherTime: new Date(),
      selectedHalls: [0, 1, 2]
    }
  },

  watch: {
    selectedHalls (val) {
      this.filterHall(val)
    },
    searchName (val) {
      this.filterName(val)
    },
    hideHigher (enableFilter) {
      this.updHighFilter(enableFilter)
    },
    higherTime (enableFilter) {
      this.updHighFilter(enableFilter)
    },
    hideLower (enableFilter) {
      this.updLowerFilter(enableFilter)
    },
    lowerTime (enableFilter) {
      this.updLowerFilter(enableFilter)
    },
    hideExpired (enableFilter) {
      if (enableFilter) {
        this.lowerTime = new Date()
      }
      this.hideLower = enableFilter
    }
  },

  computed: {
    ...mapGetters('concert', [
      'concerts'
    ]),
    ...mapGetters('hall', [
      'halls'
    ]),
    ...mapGetters('user', [
      'role'
    ])
  },

  methods: {
    ...mapActions('concert', [
      'filterName',
      'filterHall',
      'filterHideHigher',
      'filterHideLower'
    ]),
    updHighFilter (enableFilter) {
      let dateWithTimezone = new Date(this.higherTime)
      let date = new Date(dateWithTimezone.getTime() - (dateWithTimezone.getTimezoneOffset() * 60000)).toISOString()
      this.filterHideHigher(enableFilter ? date.slice(0, 23) : null)
    },
    updLowerFilter (enableFilter) {
      let dateWithTimezone = new Date(this.lowerTime)
      let date = new Date(dateWithTimezone.getTime() - (dateWithTimezone.getTimezoneOffset() * 60000)).toISOString()
      this.filterHideLower(enableFilter ? date.slice(0, 23) : null)
    }
  },

  components: {
    DateTimePicker
  }
}
</script>

<style scoped>

</style>
