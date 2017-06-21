import { Vue, Component } from 'vue-property-decorator'

import WordTyper from 'components/wordTyper'
import Race from 'components/Race.vue'
import Stats from 'components/stats'
import SpeedGraph from 'components/speedGraph'
import SaveScore from 'components/saveScoreModal'

@Component({
  name: 'SinglePlayer',
  components: {
    WordTyper,
    Race,
    Stats,
    SpeedGraph,
    SaveScore
  }
})
export default class SinglePlayer extends Vue {
  loading: boolean = false
  saveScore: boolean = false

  get playing() {
      return this.$store.getters.timeElapsed
    }

  get finished() {
      return this.$store.getters.finished
    }

  created() {
    this.$store.dispatch('reset')

    const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    this.loading = true

    this.$http.get(url).then((res) => {
      if (!res.body) {
        this.loading = false
        return
      } else {
        const text = res.body.quoteText.trim()
        const source = res.body.quoteAuthor

        this.$store.dispatch('reset', { text, source })
        this.loading = false
      }
    }, (err) => {
      this.loading = false
    })
  }

  save() {
    this.$router.push('scores')
  }
}
