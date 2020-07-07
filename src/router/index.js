/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})

router.beforeEach((to, from, next) => {
  // actions
  let fromActions = []
  let toActions = []

  from.matched.forEach(record => {
    if (record.meta.actions) {
      record.meta.actions.forEach(action => fromActions.push(action))
    }
  })

  to.matched.forEach(record => {
    if (record.meta.actions) {
      record.meta.actions.forEach(action => {
        toActions.push(action)
      })
    }
  })

  toActions = toActions.filter(action => fromActions.indexOf(action) === -1)
  ;(async () => {
    for (let i = 0; i < toActions.length; i++) {
      switch (toActions[i]) {
        // sync actions
        case 'getQuotes':
          await store().dispatch('app/getQuotes')
          break
      }
    }
  })()
  next()
})

export default router
