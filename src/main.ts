import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueSvgIcon from 'vue-svgicon'
import moment from 'moment'
import App from './App.vue'
import store from './store/store'
import routes from './routes'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueSvgIcon)

Vue.filter('formatTime', function(ms) {
  const zeroTime = moment('2016-06-12 00:00:00')

  if (ms > 3600000) {
    return zeroTime.add(ms, 'milliseconds').format('HH:mm:ss:SSS')
  } else if (ms > 60000) {
    return zeroTime.add(ms, 'milliseconds').format('mm:ss:SSS')
  } else if (ms > 1000) {
    return zeroTime.add(ms, 'milliseconds').format('ss:SSS')
  } else {
    return zeroTime.add(ms, 'milliseconds').format('SSS')
  }
})

Vue.filter('dateFormat', (date, format) => {
  return moment(date).format(format || 'MMMM Do, YYYY - HH:mm:ss')
})

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
