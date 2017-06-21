import { Vue, Component } from 'vue-property-decorator'
import getScoresBy from 'database/db'

@Component({
  name: 'Scores'
})
export default class Scores extends Vue {
  orderBy = 'date'
  scoresRef =  null
  scores =  []

  created() {
    this.scores = getScoresBy()
  }

  sortBy(by) {
    this.scores = getScoresBy(by)
  }

  home() {
    this.$router.push('/')
  }
}
