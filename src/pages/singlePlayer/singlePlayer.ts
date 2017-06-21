import WordTyper from 'components/WordTyper.vue'
import Race from 'components/Race.vue'
import Stats from 'components/stats'
import SpeedGraph from 'components/speedGraph'
import SaveScore from 'components/SaveScore.vue'

export default {
  name: 'SinglePlayer',
  components: {
    WordTyper,
    Race,
    Stats,
    SpeedGraph,
    SaveScore
  },
  data() {
    return {
      loading: false,
      saveScore: false
    }
  },
  computed: {
    playing() {
      return this.$store.getters.timeElapsed
    },
    finished() {
      return this.$store.getters.finished
    }
  },
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
  },
  methods: {
    save() {
      this.$router.push('scores')
    }
  }
}
