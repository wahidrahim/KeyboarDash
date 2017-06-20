<template lang="html">
  <div id="graph">
    <svg class="graph" :width="width" :height="height">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(255, 0, 0, 0.5);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0, 0, 255, 0.8);stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- background -->
      <!-- <rect :width="width" :height="height" fill="white"></rect> -->
      <!-- x label -->
      <text class="axis-label"
      :x="width / 2 - 20"
      :y="height + 50">Seconds</text>
      <!-- x-axis -->
      <line class="x-axis"
      :x1="0"
      :y1="height"
      :x2="width"
      :y2="height"
      fill="none"
      stroke="black"></line><!-- end of x-axis -->
      <!-- x interval lines -->
      <line class="x-interval-lines interval-lines"
      v-for="i in maxXintervals"
      v-show="xInterval(i) <= width"
      :x1="xInterval(i)"
      :y1="height"
      :x2="xInterval(i)"
      :y2="0"></line>
      <!-- x interval labels -->
      <text class="time-label"
      v-for="i in maxXintervals"
      v-show="xInterval(i) <= width"
      :x="xInterval(i)"
      :y="height + 10">{{ xLabel(i) }}</text>
      <!-- y-axis -->
      <line class="y-axis"
      :x1="0"
      :y1="height"
      :x2="0"
      :y2="0"
      fill="none"
      stroke="black"></line><!-- end of x-axis -->
      <!-- y label -->
      <text class="axis-label"
      :transform="`rotate(-90 0 ${height / 2})`"
      :x="0"
      :y="height / 2 - 60">WPM</text>
      <!-- y interval lines -->
      <line class="y-interval-lines interval-lines"
      v-for="i in maxYintervals"
      v-show="maxValue > 0"
      :x1="0"
      :y1="yInterval(i)"
      :x2="width"
      :y2="yInterval(i)"></line>
      <!-- y interval labels -->
      <text class="value-label"
      text-anchor="end"
      v-for="i in maxYintervals"
      v-show="maxValue > 0"
      :x="-10"
      :y="yInterval(i)">{{ yLabel(i) }}</text>
      <!-- plotted line -->
      <polyline :points="plot" fill="url(#gradient)" stroke="black"></polyline>
      <!-- current value line -->
      <line class="current-value-line"
      stroke-dasharray="5, 5"
      v-show="maxValue > 0"
      fill="none"
      :x1="-50"
      :y1="valueLineHeight()"
      :x2="width"
      :y2="valueLineHeight()"></line>
      <!-- current value -->
      <text class="current-value"
      text-anchor="end"
      v-show="maxValue > 0"
      :x="-10"
      :y="valueLineHeight() - 3"
      fill="orangered">{{ value.toFixed(2) }}</text>
    </svg>
    <div class="waiting" v-if="!time">
      waiting for input<br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'graph',
  props: {
    width: {
      default: 600,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    }
  },
  data() {
    return {
      points: [], // contains point objects - { x: 12, y: 34 }, { x: 56, y: 78 } ...
      maxValue: 0, // highest y-value in the graph
      maxXintervals: 30, // graph shows 30 vertical lines at max
      maxYintervals: 10, // graph shows 10 horizontal lines at max
      secondsPerInterval: 1, // increases by 2 every 30 seconds: 1, 2, 4, 6, 8, 10...
    }
  },
  computed: {
    completedText() {
      return this.$store.getters.completedText
    },
    value() {
      return this.$store.getters.speed
    },
    time() {
      return this.$store.getters.timeElapsed
    },
    plot() {
      // reset when time is 0
      if (this.time === 0) {
        this.points = []
        this.maxValue = 0

        return ''
      }

      const startPoint = `0,${this.height}`
      const endPoint = ` ${this.width},${this.height}`

      let strPlot = this.points.reduce((strPlotAcc, value, i) => {
        this.maxValue = value.y > this.maxValue ? value.y : this.maxValue

        const x = this.width * (value.x / this.time)
        const y = value.y ? this.height - this.height * (value.y / this.maxValue) : this.height

        strPlotAcc += ` ${x},${y}`

        return strPlotAcc
      }, startPoint)

      strPlot += endPoint

      return strPlot
    },
    averageLineHeight() {
      const sum = this.points.reduce((sum, val) => {
        return sum + val.y
      }, 0)
      const average = sum / this.points.length

      const height = this.height - this.height * (average / this.maxValue) || this.height

      return height
    }
  },
  watch: {
    completedText() {
      this.points.push({
        x: this.time,
        y: this.value
      })
    },
  },
  methods: {
    valueLineHeight() {
      return this.maxValue ? this.height - this.height * this.value / this.maxValue : this.height
    },
    xInterval(i) {
      const minute = 60000
      const spacingInterval = Math.floor((this.time / minute * 2)) // space out every 30 seconds
      const seconds = 1000 * this.secondsPerInterval
      const interval = this.width / this.time * seconds

      this.secondsPerInterval = spacingInterval > 0 ? 2 * spacingInterval : 1

      // hide lines
      if (this.time === 0) {
        return this.width + 1
      }

      return interval * i
    },
    xLabel(i) {
      return this.secondsPerInterval * i
    },
    yInterval(i) {
      const space = this.height / this.maxYintervals

      return space * i - space
    },
    yLabel(i) {
      const interval = this.maxValue / this.maxYintervals
      const multiplier = i - 1

      return (this.maxValue - interval * multiplier).toFixed(2)
    },
    intervalSecond(i) {
      return this.secondsPerInterval * i
    }
  }
}
</script>

<style lang="scss" scoped>
#graph {
  text-align: center;
  position: relative;

  .graph {
    // border: 1px solid black;
    padding: 10px 45px 55px 75px;

    .time-label,
    .value-label,
    .current-value {
      font-size: 10px;
      font-family: monospace;
    }

    .axis-label {
      font-family: sans-serif;
    }

    .interval-lines {
      fill: none;
      stroke: rgba(255, 255, 255, 0.3);
    }

    .current-value {
      font-weight: bold;
      fill: white;
      font-size: 12px;
      // font-family: sans-serif;
    }

    .current-value-line {
      stroke: black;
    }
  }

  .waiting {
    font-size: 32px;
    font-family: sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    color: rgba(0, 0, 0, 0.5);
  }

  .waiting:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 900ms infinite;
    animation: ellipsis steps(4,end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
}
</style>
