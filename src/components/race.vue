<template lang="html">
  <div class="race">
    <div class="progress-bar">
      <div class="progress" :style="raceState()"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      default: 0,
      type: Number
    },
    speed: {
      default: 0,
      type: Number
    }
  },
  methods: {
    raceState() {
      const width = `${this.progress}%`
      const ratio = this.speed / 200

      let red = (ratio * 255).toFixed(0)
      let blue = ((1 - ratio) * 255).toFixed(0)
      let background = `rgb(${red}, 0, ${blue})`

      return {
        width,
        background
      }
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

    .progress {
      height: 100%;
    //   background: green;
    //   border-radius: $height / 2;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border-top-right-radius: $height / 2;
      border-bottom-right-radius: $height / 2;
    }
  }
}
</style>
