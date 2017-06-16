<template lang="html">
  <div class="stats">
    <div class="speed">
      {{ speed ? speed : '000.00' }} WPM
    </div>
    <div class="time-elapsed">
      {{ time | formatTime }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    speed() {
      return this.$store.getters.speed.toFixed(2)
    },
    time() {
      return this.$store.getters.timeElapsed
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
