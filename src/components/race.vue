<template lang="html">
  <div class="race">
    <div class="progress-bar">
      <div class="progress" :style="raceState()"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    raceState() {
      const width = `${this.$store.getters.percentageCompleted}%`
      const ratio = this.$store.getters.speed / 200
      const red = (ratio * 255).toFixed(0)
      const blue = ((1 - ratio) * 255).toFixed(0)
      const background = `rgb(${red}, 0, ${blue})`

      return { width, background }
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 25px;

.race {
  .progress-bar {
    height: $height;
    box-sizing: border-box;
    margin-top: 15px;
    margin-bottom: 10px;

    .progress {
      height: 100%;
      box-sizing: border-box;
      border: 1px solid black;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border-top-right-radius: $height / 2;
      border-bottom-right-radius: $height / 2;
    }
  }
}
</style>
