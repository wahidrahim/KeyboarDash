<template lang="html">
  <div class="time-elapsed">
    <!-- {{ seconds }}:{{ milliseconds }} -->
    <!-- {{ seconds | timeElapsed }} -->
    {{ timer.milliseconds | timeElapsed }}
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    // seconds: { type: Number },
    // milliseconds: { type: Number }
    timer: { type: Object }
  },
  filters: {
    timeElapsed: function(ms) {
        const zeroTime = moment('2016-06-12 00:00:00')

        return zeroTime.add(ms, 'milliseconds').format('mm:ss:SSS')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
