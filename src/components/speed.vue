<template lang="html">
  <div class="speed">
    {{ speed.toFixed(0) }} WPM
  </div>
</template>

<script>
export default {
  props: {
    speed: { type: Number }
  }
}
</script>

<style lang="scss" scoped>
.speed {
  font-size: 24px;
}
</style>
