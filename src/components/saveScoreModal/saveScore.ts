import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import axios from 'axios'

@Component
export default class SaveScore extends Vue {
  name: string = 'Anonymous'
  @Getter speed: number
  @Getter('timeElapsed') time: number
  @Getter('originalText') text: string
  @Getter('textSource') source: string
  $refs: { nameInput: HTMLInputElement }

  save() {
    const data = {
      name: this.name.length ? this.name : 'Anonymous',
      speed: this.speed,
      time: this.time,
      text: this.text,
      source: this.source,
      date: new Date().getTime()
    }

    // TODO: Validate data

    axios.post('https://whispering-liatris.firebaseio.com/scores.json', data)
    .then((res) => {
      this.$router.push('scores')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  close() {
    this.$emit('close')
  }

  selectText() {
    this.$refs.nameInput.select()
  }

  mounted() {
    this.selectText()
  }
}
