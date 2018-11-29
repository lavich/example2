// Store module for content list files

import { Http } from '@/api/http'

let getDate = () => {
  var date = new Date()
  return new Date(
    date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
}
const url = '/api/concert'

// state
const state = {
  num_results: 0,
  objects: [],
  page: 1,
  total_pages: 0,
  filters: {
    isNotDeleted: { name: 'is_deleted', op: 'eq', val: false },
    nameConcert: { name: 'title', op: 'like', val: '%' + '' + '%' },
    hallId: { name: 'hall_id', op: 'in', val: [0, 1, 2] },
    hideHigher: null,
    hideLower: null
  },
  model: {
    id: 0,
    title: '',
    hall_id: null,
    autoStart: true,
    start: getDate(),
    autoStop: true,
    end: getDate(),
    is_geo_limitation: false,
    playFromFile: false,
    publishAir: false,
    restream: [],
    description: '',
    iframe: ''
  },
  nearConcert: null
}

// getters
const getters = {
  concerts: state => state.objects,
  page: state => state.page,
  total_pages: state => state.total_pages,
  concert: state => id => {
    for (let i = 0; i < state.objects.length; i++) {
      if (state.objects[i].id === Number(id)) {
        return Object.assign({}, state.model, state.objects[i])
      }
    }
    return Object.assign({}, state.model)
  },
  nearConcert: state => Object.assign({}, state.model, state.nearConcert)
}

// actions
const actions = {
  init: ({ dispatch, commit, state }) => {
    if (state.objects.length === 0) {
      dispatch('load')
    }
  },
  near ({ state, commit }, hallId) {
    let { isNotDeleted } = state.filters
    let params = {
      q: {
        filters: [isNotDeleted, { name: 'hall_id', op: 'eq', val: hallId }, { name: 'end', op: '>=', val: getDate() }],
        order_by: [{ field: 'end', direction: 'asc' }]
      },
      page: 1,
      results_per_page: 1
    }
    Http.get(url, { params }).then(response => {
      let near = null
      if (!response.data.num_results || response.data.num_results === 0) {
        near = null
      } else {
        near = response.data.objects[0]
      }
      commit('nearConcert', near)
    })
  },
  load ({ state, commit }, page) {
    let { isNotDeleted, hallId, nameConcert, hideHigher, hideLower } = state.filters
    let data = {
      q: { filters: [isNotDeleted, hallId, nameConcert], order_by: [{ field: 'start', direction: 'desc' }] },
      page: !page ? state.page : page,
      results_per_page: 5
    }
    if (hideHigher) {
      data.q.filters.push(hideHigher)
    }
    if (hideLower) {
      data.q.filters.push(hideLower)
    }
    Http.get(url, { params: data }).then(response => {
      if (!response.data.num_results || response.data.num_results === 0) {
      } else {
        commit('set', response.data)
      }
    })
  },
  create: ({ state, commit, dispatch }, data) => {
    let saveData = { title: data.title, start: data.start, end: data.end, hall_id: data.hall_id }
    Http.post(url, saveData).then(() => {
      commit('common/setError', 'Успешно!', { root: true })
    }).catch(() => {
      commit('common/setError', 'Ошибка при создании концерта', { root: true })
    }).finally(() => {
      dispatch('load')
    })
  },
  update: ({ state, commit, dispatch }, data) => {
    Http.put(url + '/' + data.id, data).then(() => {
      commit('common/setError', 'Успешно!', { root: true })
    }).catch(() => {
      commit('common/setError', 'Ошибка при обновлении концерта', { root: true })
    }).finally(() => {
      dispatch('load')
    })
  },
  filterName: ({ commit, dispatch }, name) => {
    commit('setFilterName', name)
    dispatch('load')
  },
  filterHall: ({ commit, dispatch }, hallIdArray) => {
    commit('setFilterHall', hallIdArray)
    dispatch('load')
  },
  filterHideHigher: ({ commit, dispatch }, date) => {
    commit('setFilterHideHigher', date)
    dispatch('load')
  },
  filterHideLower: ({ commit, dispatch }, date) => {
    commit('setFilterHideLower', date)
    dispatch('load')
  }
}

// mutations
const mutations = {
  set (state, data) {
    state.objects = data.objects
    state.page = data.page
    state.total_pages = data.total_pages
  },
  nearConcert (state, data) {
    state.nearConcert = data
  },
  setFilterName (state, name) {
    if (!name) {
      name = ''
    }
    state.filters.nameConcert.val = '%' + name + '%'
  },
  setFilterHall (state, hallIdArray) {
    state.filters.hallId.val = hallIdArray
  },
  setFilterHideHigher (state, date) {
    if (date) {
      state.filters.hideHigher = { name: 'end', op: '<', val: date }
    } else {
      state.filters.hideHigher = null
    }
  },
  setFilterHideLower (state, date) {
    if (date) {
      state.filters.hideLower = { name: 'end', op: '>', val: date }
    } else {
      state.filters.hideLower = null
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
