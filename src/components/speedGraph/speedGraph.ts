import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'SpeedGraph'
})
export default class SpeedGraph extends Vue {
  @Prop({ default: 600 })
  width: number

  @Prop({ default: 400 })
  height: number

  points = [] // contains point objects - { x: 12, y: 34 }, { x: 56, y: 78 } ...
  maxValue = 0 // highest y-value in the graph
  maxXintervals = 30 // graph shows 30 vertical lines at max
  maxYintervals = 10 // graph shows 10 horizontal lines at max
  secondsPerInterval = 1 // increases by 2 every 30 seconds: 1, 2, 4, 6, 8, 10...

  get completedText() {
    return this.$store.getters.completedText
  }

  get value() {
    return this.$store.getters.speed
  }

  get time() {
    return this.$store.getters.timeElapsed
  }

  get plot() {
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
  }

  get averageLineHeight() {
    const sum = this.points.reduce((sum, val) => {
      return sum + val.y
    }, 0)
    const average = sum / this.points.length

    const height = this.height - this.height * (average / this.maxValue) || this.height

    return height
  }

  @Watch('completedText')
  updatePoints() {
    this.points.push({
      x: this.time,
      y: this.value
    })
  }

  valueLineHeight() {
    return this.maxValue ? this.height - this.height * this.value / this.maxValue : this.height
  }

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
  }

  xLabel(i) {
    return this.secondsPerInterval * i
  }

  yInterval(i) {
    const space = this.height / this.maxYintervals

    return space * i - space
  }

  yLabel(i) {
    const interval = this.maxValue / this.maxYintervals
    const multiplier = i - 1

    return (this.maxValue - interval * multiplier).toFixed(2)
  }

  intervalSecond(i) {
    return this.secondsPerInterval * i
  }
}
