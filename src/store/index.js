import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'

Vue.use(Vuex)

export default function() {
  return new Vuex.Store({
    modules: {
      app
    }
  })
}
