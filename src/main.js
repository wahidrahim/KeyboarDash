import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

import store from './store/store'

export const Bus = new Vue()

Vue.use(VueResource)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
