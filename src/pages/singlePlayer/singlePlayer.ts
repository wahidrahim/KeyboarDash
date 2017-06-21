import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import WordTyper from 'components/wordTyper'
import Race from 'components/race'
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
  },
  computed: {
    ...mapGetters({
      playing: 'timeElapsed',
      finished: 'finished'
    })
  }
})
export default class SinglePlayer extends Vue {
  loading: boolean = false
  saveScore: boolean = false

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
