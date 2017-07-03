import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  name: 'Scores'
})
export default class Scores extends Vue {
  orderBy = 'date'
  scoresRef =  null
  scores =  []

  created() {
    this.sortBy()
  }

  sortBy(by: string = 'date') {
    // TODO PRODUCTION PORT
    axios.get('//localhost:3000/api/scores?by=' + by)
    .then((res) => {
      this.scores = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }

  home() {
    this.$router.push('/')
  }
}
