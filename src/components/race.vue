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
      let background = 'lightgreen'

      if (this.speed >= 50 && this.speed < 80) {
        background = 'green'
      } else if (this.speed >= 80 && this.speed < 100) {
        background = 'orange'
      } else if (this.speed >= 100 && this.speed < 150) {
        background = 'orangered'
      } else if (this.speed >= 150) {
        background = 'red'
      }

      return {
        width,
        background
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.race {
  .progress-bar {
    height: 25px;
    box-sizing: border-box;
    margin-top: 15px;

    .progress {
      height: 100%;
      background: green;
    }
  }
}
</style>
