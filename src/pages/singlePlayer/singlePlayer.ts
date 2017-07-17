import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import axios from 'axios'

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
  showSaveScore: boolean = false

  created() {
    this.$store.dispatch('reset')

    this.loading = true

    axios.get('/api/randomQuote')
    .then((res) => {
      this.$store.dispatch('reset', {
        text: res.data.quoteText.trim(),
        source: res.data.quoteAuthor.trim()
      })
    })
    .catch((err) => {
      console.log(err)
    })
    .then(() => {
      this.loading = false
    })
  }

  toggleTimer(playing) {
    if (playing) {
      this.$store.dispatch('startTimer')
    } else {
      this.$store.dispatch('stopTimer')
    }
  }

  save() {
    this.$router.push('scores')
  }
}
