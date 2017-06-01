<template lang="html">
  <div class="speed">
    {{ speed ? speed : '000.000' }} WPM
  </div>
</template>

<script>
export default {
  computed: {
    speed() {
      return this.$store.getters.speed
    }
  }
}
</script>

<style lang="scss" scoped>
.speed {
  font-size: 24px;
}
</style>
