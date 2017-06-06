<template lang="html">
  <div class="speed">
    {{ speed ? speed : '000.00' }} WPM
  </div>
</template>

<script>
export default {
  computed: {
    speed() {
      return this.$store.getters.speed.toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.speed {
  font-size: 24px;
}
</style>
