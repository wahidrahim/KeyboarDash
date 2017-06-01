<template lang="html">
  <div class="speed">
    {{ speed ? speed : '0.000' }} WPM
  </div>
</template>

<script>
import { Bus } from '../main'

export default {
  computed: {
    speed() {
      const mins = this.$store.getters.timeElapsed / 60000
      const standardWords = this.$store.getters.completedText.length / 5
      const speed = mins ? (standardWords / mins).toFixed(3) : 0

      Bus.$emit('speed', speed)

      return speed
    }
  }
}
</script>

<style lang="scss" scoped>
.speed {
  font-size: 24px;
}
</style>
