import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import '../node_modules/bootstrap/scss/bootstrap.scss'
import '../public/styles/main.scss'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.config.productionTip = false

// custom validation rule
extend('required', {
  ...required,
  message: 'Введите {_field_}'
})

// custom validation classes
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
