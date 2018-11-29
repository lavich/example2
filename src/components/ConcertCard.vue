<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Основные настройки</v-stepper-step>
      <v-stepper-step :complete="e1 > 2" step="2">Дополнительные настройки</v-stepper-step>
      <v-stepper-step step="3">Необязательные настройки</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form v-model="validStep1">
          <v-text-field
            required
            v-model="concert.title"
            label="Название трансляции"
            :rules="[v => !!v || 'Обязательно']"
          ></v-text-field>
          <v-select
            v-model="concert.hall_id"
            :items="halls"
            item-text="name"
            item-value="id"
            label="Зал"
            :rules="[v => typeof(v) === 'number' || 'Обязательно']"
          ></v-select>
          <v-switch
            v-model="concert.autoStart"
            label="Автостарт"
          ></v-switch>
          <date-time-picker
            v-model="concert.start"
            :disabled="!concert.autoStart"
          > Начало
          </date-time-picker>
          <v-switch
            v-model="concert.autoStop"
            label="Автостоп"
          ></v-switch>
          <date-time-picker
            v-model="concert.end"
            :disabled="!concert.autoStop"
          > Окончание
          </date-time-picker>
        </v-form>
        <v-divider></v-divider>
        <v-layout justify-space-between>
          <v-btn flat @click.stop="btnCancel">
            Отмена
          </v-btn>
          <v-btn color="primary" @click="e1++" :disabled="!validStep1">
            Вперед
          </v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form v-model="validStep2">
          <v-switch
            v-model="concert.is_geo_limitation"
            label="Геоограничение"
          ></v-switch>
          <v-switch
            v-model="concert.playFromFile"
            label="Воспроизводить из файла"
          ></v-switch>
          <v-switch
            v-model="concert.publishAir"
            label="Публикация в прямом эфире"
          ></v-switch>

          <v-switch
            label="Рестрим"
            :value="concert.restream && concert.restream.length > 0"
            @change="addRestream"
          ></v-switch>
          <v-layout v-for="(row, index) in concert.restream" :key="index">
            <v-flex xs6>
              <v-text-field
                autofocus
                v-model="row.url"
                label="Url"
                :rules="[v => !!v || 'Обязательно']"
              ></v-text-field>
            </v-flex>
            <v-flex xs5>
              <v-text-field
                v-model="row.key"
                label="Key"
                :rules="[v => !!v || 'Обязательно']"
              ></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-btn icon @click="concert.restream.splice(index, 1)">
                <v-icon>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-btn
            block flat
            v-if="concert.restream && concert.restream.length > 0"
            @click="addRestream">
            Добавить
          </v-btn>
        </v-form>
        <v-divider></v-divider>
        <v-layout justify-space-between>
          <v-btn flat @click="e1--">Назад</v-btn>
          <v-btn color="primary" @click="e1++" :disabled="!validStep2">
            Вперед
          </v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-textarea
          rows="3"
          v-model="concert.description"
          label="Описание"></v-textarea>
        <v-textarea
          readonly rows="3"
          v-model="concert.iframe"
          label="Код плеера"></v-textarea>
        <v-divider></v-divider>
        <v-layout justify-space-between>
          <v-btn flat @click="e1--">Назад</v-btn>
          <v-btn
            color="primary"
            @click.stop="saveConcert"
          >
            Сохранить
          </v-btn>
        </v-layout>
      </v-stepper-content>

    </v-stepper-items>

  </v-stepper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateTimePicker from '@/components/DateTimePicker'

export default {
  name: 'ConcertCard',

  props: {
    id: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      concert: {},
      e1: 0,
      validStep1: false,
      validStep2: false
    }
  },
  computed: {
    ...mapGetters('concert', {
      getConcert: 'concert'
    }),
    ...mapGetters('hall', [
      'halls'
    ]),
    ...mapGetters('user', [
      'role'
    ])
  },
  methods: {
    ...mapActions('concert', [
      'create',
      'update'
    ]),
    addRestream (value) {
      if (value) {
        this.concert.restream.push({ url: '', key: '' })
      } else {
        this.concert.restream = []
      }
    },
    saveConcert () {
      if (this.concert.id === 0) {
        this.create(this.concert).then(this.btnCancel)
      } else {
        this.update(this.concert).then(this.btnCancel)
      }
    },
    btnCancel () {
      this.$emit('cancel')
    }
  },

  created () {
    this.concert = JSON.parse(JSON.stringify(this.getConcert(this.id)))
  },

  components: {
    DateTimePicker
  }

}
</script>

<style scoped>

</style>
