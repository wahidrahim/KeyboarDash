import { Vue, Component } from 'vue-property-decorator'
import car from './car.vue'

@Component({
  components: {
    car
  }
})
export default class Race extends Vue {
  carWidth = 100
  trackWidth = 0

  get completed() {
    return this.$store.getters.percentageCompleted
  }

  moveCar() {
    const distance = this.trackWidth + this.carWidth
    const move = this.completed / 100 * distance
    const left = `${move - this.carWidth}px`


    return { left }
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
