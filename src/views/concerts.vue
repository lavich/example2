<template>
  <div class="container">
    <div class="concerts">
      <div v-for="concert in concerts" :key="concert.id">
        <concert-view v-bind="concert"
                      :hall="hall(concert.hall_id || 0).name"
                      @goto="editConcert"
        ></concert-view>
      </div>
    </div>
    <concert-filter class="filter"></concert-filter>
    <paginator class="paginator"></paginator>
    <div class="btn" v-if="role.create">
      <v-btn @click="editConcert(0)" class="ml-0">Запланировать трансляцию</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ConcertFilter from '@/components/ConcertFilter'
import ConcertView from '@/components/ConcertView'
import Paginator from '@/components/Paginator'

export default {

  name: 'Concerts',

  data () {
    return {
      scrollY: 0
    }
  },

  computed: {
    ...mapGetters('concert', [
      'concerts',
      'filterSettings'
    ]),
    ...mapGetters('user', [
      'role'
    ]),
    ...mapGetters('hall', [
      'halls',
      'hall'
    ])
  },

  methods: {
    ...mapActions('hall', {
      fetchHall: 'fetch'
    }),
    editConcert (id) {
      this.$router.push('/concert/' + id)
    }
  },

  components: {
    ConcertFilter,
    ConcertView,
    Paginator
  }

}
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 400px;
    grid-gap: 10px;
    grid-template-areas: "concerts concerts filter" "btn paginator filter";
  }

  .concerts {
    display: grid;
    grid-area: concerts;
    align-content: space-between;
  }

  .btn {
    display: grid;
    grid-area: btn;
    align-content: end;
    justify-content: start;
  }

  .paginator {
    display: grid;
    grid-area: paginator;
    align-content: end;
    justify-content: end;
  }

  .filter {
    display: grid;
    grid-area: filter;
    align-content: start;
  }

  @media (max-width: 1260px) {
    .container {
      grid-template-columns: 1fr 400px;
      grid-template-rows: 40px auto 40px;
      grid-template-areas: "btn filter" "concerts filter" "paginator filter";
    }

    .btn {
      align-content: center;
      justify-content: center;
    }

    .paginator {
      align-content: center;
      justify-content: center;
    }
  }

  @media (max-width: 996px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto;
      grid-template-areas: "filter" "btn" "concerts" "paginator";
    }

    .btn {
      align-content: center;
      justify-content: center;
    }

    .paginator {
      align-content: center;
      justify-content: center;
    }
  }
</style>
