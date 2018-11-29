// Store module for content list files

import { Http } from '@/api/http'

const loginUrl = '/api/auth/login'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token
}

const actions = {
  auth: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit('request')
      let { rememberMe } = user
      Http.post(loginUrl, user).then(resp => {
        const token = resp.data.token
        if (rememberMe) {
          localStorage.setItem('user-token', token) // store the token in localstorage
        }
        commit('success', token)
        Http.defaults.headers.common['Authorization'] = token
        resolve(resp)
      }).catch(err => {
        commit('error', err)
        commit('common/setError', 'Не верный логин или пароль', { root: true })
        localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
        delete Http.defaults.headers.common['Authorization']
        reject(err)
      })
    })
  },
  logout: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('user-token') // clear your user's token from localstorage
      delete Http.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

const mutations = {
  request: (state) => {
    state.status = 'loading'
  },
  success: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  error: (state) => {
    state.status = 'error'
  },
  logout: (state) => {
    state.status = 'logout'
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
