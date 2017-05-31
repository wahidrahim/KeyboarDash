<template lang="html">
  <div class="speed">
    {{ speed }} WPM
  </div>
</template>

<script>
export default {
  props: ['speed']
}
</script>

<style lang="scss" scoped>
.speed {
  font-size: 24px;
}
</style>
