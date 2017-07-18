import { Vue, Component, Prop } from 'vue-property-decorator'
import car from './car.vue'

@Component({
  components: {
    car
  }
})
export default class Race extends Vue {
  carWidth: number = 100
  trackWidth: number = 0
  $refs: { track: HTMLDivElement }

  @Prop()
  complete: number


  get completed() {
    return this.$store.getters.percentageCompleted
  }

  moveCar() {
    if (!this.complete) {

      const distance = this.trackWidth
      const move = this.completed / 100 * distance
      const left = `${move - this.carWidth}px`

      return { left }
    } else {
      const distance = this.trackWidth
      const move = this.complete / 100 * distance
      const left = `${move - this.carWidth}px`

      return { left }
    }
  }

  mounted() {
    this.trackWidth = this.$refs.track.offsetWidth
  }

  raceState() {
    const width = `${this.$store.getters.percentageCompleted}%`
    const ratio = this.$store.getters.speed / 200
    const red = (ratio * 255).toFixed(0)
    const blue = ((1 - ratio) * 255).toFixed(0)
    const background = `rgb(${red}, 0, ${blue})`

    return { width, background }
  }
}
