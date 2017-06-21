import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component
export default class Race extends Vue {
  raceState() {
    const width = `${this.$store.getters.percentageCompleted}%`
    const ratio = this.$store.getters.speed / 200
    const red = (ratio * 255).toFixed(0)
    const blue = ((1 - ratio) * 255).toFixed(0)
    const background = `rgb(${red}, 0, ${blue})`

    return { width, background }
  }
}
