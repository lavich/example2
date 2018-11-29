// Store module for content list files

import { Http } from '@/api/http'

const statusUrl = '/api/auth/status'

const state = {
  status: '',
  id: 0,
  username: '',
  active: false,
  role: {}
}

const getters = {
  role: state => state.role,
  isAdmin: state => state.role.hasOwnProperty('admin') ? state.role.admin : false,
  username: state => state.username
}

const actions = {
  status: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('request')
      Http.get(statusUrl).then(resp => {
        let { active, id, role, username } = resp.data.data
        commit('success', { active, id, role, username })
        resolve(resp)
      }).catch(err => {
        console.log(err)
        commit('common/setError', 'Ошибка при аутентификации', { root: true })
        reject(err)
      })
    })
  }
}

const mutations = {
  request: (state) => {
    state.status = 'loading'
  },
  success: (state, { active, id, role, username }) => {
    state.status = 'success'
    state.active = active
    state.id = id
    state.role = role
    state.username = username
  },
  error: (state) => {
    state.status = 'error'
  },
  logout: (state) => {
    state.status = 'logout'
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
