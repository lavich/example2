// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store'
import { Http } from './api/http'

Vue.use(Vuex)
Vue.config.productionTip = false
const moment = require('moment')
require('moment/locale/ru')

Vue.use(require('vue-moment'), {
  moment
})

Vue.use(Vuetify, {
  theme: {
    primary: '#9d1626',
    secondary: '#f9f9f9'
  }
})

const token = localStorage.getItem('user-token')
if (token) {
  Http.defaults.headers.common['Authorization'] = token
  store.dispatch('user/status')
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')
