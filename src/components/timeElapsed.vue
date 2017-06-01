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

        return zeroTime.add(ms, 'milliseconds').format('mm:ss:SSS')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
