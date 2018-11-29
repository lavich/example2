<template>

  <v-layout wrap row justify-center fill-height>
    <v-flex lg3>
      <v-select
        :value="selectedHallId"
        :items="halls"
        item-text="name"
        item-value="id"
        solo
        @input="near"
      >
        <p slot="no-data" class="pl-2">Нет данных о залах</p>
      </v-select>
    </v-flex>
    <v-flex offset-lg2 lg3>
      <v-btn block
      @click="$router.push({ path: '/concert/0'})"
      >
        запланировать трансляцию
      </v-btn>
    </v-flex>
    <!--<v-flex lg8 class="title">-->
      <!--Сегодня в эфире-->
    <!--</v-flex>-->

    <v-flex lg8>
      <v-card class="d_card px-2">
        <div class="d_title">
          {{concert.title}}
        </div>
        <div class="d_air">
          Эфир
          <v-switch label="Offline"></v-switch>
        </div>
        <div class="d_player">
          <v-responsive :aspect-ratio="16/9" max-width="640">
            <clappr :src="source" :width="640"></clappr>
          </v-responsive>

        </div>
        <div class="d_stat">
          <div>Статистика</div>
          <br>
          <v-data-table
            :items="stat"
            class="elevation-1"
            hide-headers
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.value }}</td>
            </template>
          </v-data-table>
        </div>
        <div class="d_btn1">
          <v-btn :class="{primary: selectedPlayer === 'monitor'}" block flat
                 @click="selectedPlayer = 'monitor'">
            Монитор
          </v-btn>
          <v-btn :class="{primary: selectedPlayer === 'monitor4'}" block flat
                 @click="selectedPlayer = 'monitor4'">
            Монитор 4
          </v-btn>
          <v-btn :class="{primary: selectedPlayer === 'player'}" block flat
                 @click="selectedPlayer = 'player'">
            Плеер
          </v-btn>
        </div>
        <div class="d_btn2">
          <v-btn block
                 @click="$router.push({ path: `/concert/${concert.id}`})"
                 :disabled="!concert.id"
          >
            настройки
          </v-btn>
          <v-btn block>
            редактор
          </v-btn>
        </div>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import Clappr from '@/components/Clappr'
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'Dashboard',

  data () {
    return {
      selectedHallId: 0,
      selectedPlayer: 'monitor',
      stat: [
        { key: 'status', name: 'Статус', value: false },
        { key: 'maxSpectator', name: 'Максимум зрителей', value: 0 },
        { key: 'watchingNow', name: 'Сейчас смотрят', value: 0 },
        { key: 'totalViews', name: 'Всего просмотров', value: 0 },
        { key: 'access', name: 'Доступ', value: true }
      ]
    }
  },

  computed: {
    ...mapGetters('hall', {
      halls: 'halls',
      getHall: 'hall'

    }),
    ...mapGetters('concert', [
      'nearConcert'
    ]),
    concert () {
      return this.nearConcert
    },
    hall () {
      return this.getHall(this.selectedHallId)
    },
    source () {
      if (!this.halls[this.selectedHallId]) {
        return ''
      }
      switch (this.selectedPlayer) {
        case 'monitor': return this.halls[this.selectedHallId].target_source
        case 'player': return this.halls[this.selectedHallId].origin_source
      }
    }
  },

  methods: {
    ...mapActions('hall', [
      'fetch'
    ]),
    ...mapActions('concert', [
      'near'
    ])
  },

  created () {
    this.fetch()
  },

  components: {
    Clappr
  }
}
</script>

<style scoped>
  .d_card {
    display: grid;
    grid-template-columns: 640px auto;
    grid-column-gap: 10px;
  }

  .d_title {
    display: grid;
    align-items: center;
  }

  .d_air {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .d_btn1 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .d_btn2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }
</style>
