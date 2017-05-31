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
      const MS = ms % 1000
      const S = Math.floor(ms / 1000)
      const M = S % 60

      return `${M}:${S}:${MS}`

      // if (s < 3600) {
      // } else {
        // return moment(`2016-06-12 00:00:00`).add(s, 'seconds').format('HH:mm:ss')
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
