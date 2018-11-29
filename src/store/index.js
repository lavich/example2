import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import users from './modules/users'
import roles from './modules/roles'
import auth from './modules/auth'
import concert from './modules/concert'
import hall from './modules/hall'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    common,
    concert,
    hall,
    roles,
    user,
    users
  },
  strict: debug
})
