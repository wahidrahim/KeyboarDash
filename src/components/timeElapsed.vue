<template lang="html">
  <div class="time-elapsed">
    {{ time | formatTime }}
  </div>
</template>

<script>
import moment from 'moment'

export default {
  computed: {
    time() {
      return this.$store.getters.timeElapsed
    }
  },
  filters: {
    formatTime: function(ms) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
