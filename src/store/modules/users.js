// Store module for content list files

import api from '@/api/users'

// state
const state = {
  num_results: 0,
  objects: [],
  page: 1,
  total_pages: 0
}

// getters
const getters = {
  users: state => state.objects,
  user: state => id => {
    for (let i = 0; i < state.objects.length; i++) {
      if (state.objects[i].id === id) {
        return JSON.parse(JSON.stringify(state.objects[i]))
      }
    }
  }
}

// actions
const actions = {
  fetch: ({ state, commit }) => {
    return new Promise((resolve, reject) => {
      if (state.page === state.total_pages) {
        console.log("Page it's  all")
        return
      }
      let data = {
        page: state.page < state.total_pages ? state.page + 1 : state.page
      }
      api
        .get(data)
        .then(response => {
          commit('set', response)
          if (response.num_results === 0) {
            return reject(response)
          }
          console.log(response)
          return resolve(response)
        })
        .catch(response => {
          return reject(response)
        })
    })
  },
  create: ({ state, commit, dispatch }, data) => {
    api
      .post(data)
      .then(response => {
        console.log(response)
      })
      .finally(() => {
        commit('clear')
        dispatch('fetch')
      })
  },
  update: ({ state, commit, dispatch }, data) => {
    api
      .put(data)
      .then(response => {
        console.log(response)
      })
      .finally(() => {
        commit('clear')
        dispatch('fetch')
      })
  },
  delete: ({ state, commit, dispatch }, id) => {
    api
      .delete(id)
      .then(response => {
        console.log(response)
      })
      .finally(() => {
        commit('clear')
        dispatch('fetch')
      })
  }
}

// mutations
const mutations = {
  clear (state) {
    state.num_results = 0
    state.objects = []
    state.page = 1
    state.total_pages = 0
  },
  set (state, data) {
    state.objects = state.objects.concat(data.objects)
    state.page = data.page
    state.total_pages = data.total_pages
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
