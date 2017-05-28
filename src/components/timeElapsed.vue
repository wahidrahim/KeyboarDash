<template lang="html">
  <div class="time-elapsed">
    {{ seconds | timeElapsed }}
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    seconds: { type: Number }
  },
  filters: {
    timeElapsed: function(sec) {
      if (sec < 3600) {
        return moment(`2016-06-12 00:00:00`).add(sec, 'seconds').format('mm:ss')
      } else {
        return moment(`2016-06-12 00:00:00`).add(sec, 'seconds').format('HH:mm:ss')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
