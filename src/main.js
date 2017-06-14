import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store/store'

import moment from 'moment'

Vue.use(VueResource)

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

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
