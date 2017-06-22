import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import 'assets/icons/racing'

@Component({
})
export default class Race extends Vue {
  carWidth = 100
  roadWidth = 0

  get completed() {
    return this.$store.getters.percentageCompleted
  }

  moveCar() {
    console.log(this.roadWidth)
    const distance = this.roadWidth - this.carWidth
    const move = this.completed / 100 * distance
    const left = `${move}px`

    return { left }
  }

  mounted() {
    this.roadWidth = document.getElementById('road').offsetWidth
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
