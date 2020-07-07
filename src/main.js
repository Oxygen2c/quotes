import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../node_modules/bootstrap/scss/bootstrap.scss'
import  '../public/styles/main.scss'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
