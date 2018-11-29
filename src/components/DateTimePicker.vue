<template>
  <v-layout wrap>
    <v-flex xs12 class="caption text-sm-left v-label">
      <slot></slot>
    </v-flex>
    <v-flex xs6 sm6>
      <v-menu
        ref="menuDate"
        :close-on-content-click="false"
        v-model="menuDate"
        :disabled="disabled"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        required
      >
        <v-text-field class="text-field"
          slot="activator"
          :value="date"
          :disabled="disabled"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker landscape :value="date" @input="changeDate"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs6 sm6>
      <v-menu
        ref="menuTime"
        :close-on-content-click="false"
        v-model="menuTime"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        required
        :disabled="disabled"
      >
        <v-text-field class="text-field"
          slot="activator"
          :value="time"
          :disabled="disabled"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker landscape format="24hr" :value="time" @input="changeTime"></v-time-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'DateTimePicker',
  props: {
    value: '',
    disabled: false
  },
  data () {
    return {
      menuDate: false,
      menuTime: false
    }
  },
  computed: {
    date () {
      var date = new Date(this.value) // Or the date you'd like converted.
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
    },
    time () {
      var date = new Date(this.value) // Or the date you'd like converted.
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(11, 16)
    }
  },
  methods: {
    changeTime (time) {
      this.$emit('input', this.date + ' ' + time + ':00.000')
    },
    changeDate (date) {
      this.$emit('input', date + ' ' + this.time + ':00.000')
    }
  }
}
</script>

<style scoped>
  .text-field {
    padding-top: 0;
  }
</style>
