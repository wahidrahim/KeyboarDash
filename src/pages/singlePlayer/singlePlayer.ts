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

    const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    this.loading = true

    axios.get(url)
    .then((res) => {
      this.$store.dispatch('reset', {
        text: res.data.quoteText.trim(),
        source: res.data.quoteAuthor.trim()
      })
      this.loading = false
    })
    .catch((err) => {
      this.loading = false
      console.log(err)
    })
  }

  save() {
    this.$router.push('scores')
  }
}
