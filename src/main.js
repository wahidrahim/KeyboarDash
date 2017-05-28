import Vue from 'vue'
import App from './App.vue'

import VueResouce from 'vue-resource'
import cors from 'cors'

Vue.use(VueResouce)
Vue.use(cors)

Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080'


new Vue({
  el: '#app',
  render: h => h(App)
})
