import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import ScoreBoard from './pages/ScoreBoard.vue'
import store from './store/store'

Vue.use(VueResource)
Vue.use(VueRouter)

const routes = [
  { path: '/scores', component: ScoreBoard }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
