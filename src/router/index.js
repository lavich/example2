import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/views/dashboard'
import login from '@/views/login'
import concerts from '@/views/concerts'
import concert from '@/views/concert'
import admin from '@/views/admin'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/concert')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const ifAdmin = (to, from, next) => {
  if (store.getters['user/isAdmin']) {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/concert',
      component: concerts,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/concert/:id',
      props: true,
      component: concert,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      beforeEnter: ifAdmin
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: ifNotAuthenticated
    }
  ]
})
