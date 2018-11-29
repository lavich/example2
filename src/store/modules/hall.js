// Store module for hall list

import { Http } from '@/api/http'

// state
const state = {
  objects: [],
  host: 'http://localhost:1935/'
}

// getters
const getters = {
  halls: state => state.objects,
  hall: state => id => {
    for (let i = 0; i < state.objects.length; i++) {
      if (state.objects[i].id === id) {
        return state.objects[i]
      }
    }
    return {name: 'Неизвестно'}
  }
}

// actions
const actions = {
  fetch: ({ state, commit }) => {
    return new Promise((resolve, reject) => {
      Http.get('/api/halls').then(response => {
        commit('set', response.data)
        return resolve(response.data)
      }).catch(response => {
        return reject(response)
      })
    })
  }
}

// mutations
const mutations = {
  set (state, data) {
    state.objects = []
    for (let i = 0; i < data.length; i++) {
      data[i].target_source = state.host + data[i].wwz_app_name + '/' + data[i].target_stream +
        '/playlist.m3u8'
      data[i].origin_source = state.host + data[i].wwz_app_name + '/' + data[i].origin_stream +
        '/playlist.m3u8'
      state.objects.push(data[i])
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
