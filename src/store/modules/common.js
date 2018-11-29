// initial state
const state = {
  error: []
}

// getters
const getters = {
  error: state => state.error.length > 0 ? state.error[0] : null
}

// actions
const actions = {
  clearError ({ commit }) {
    commit('clearError')
  },
  setError ({ commit, state }, error) {
    commit('setError', error)
  }
}

// mutations
const mutations = {
  clearError (state) {
    state.error.shift()
  },
  setError (state, error) {
    state.error.push(error)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
