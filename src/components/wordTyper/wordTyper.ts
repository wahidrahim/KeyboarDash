import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class WordTyper extends Vue {
  @Prop()
  loading: boolean

  input: string = ''
  userText: string = ''
  next: number = 0
  playing: boolean = false

  get text() {
    return {
      words: this.$store.getters.originalText.split(' '),
      source: this.$store.getters.textSource
    }
  }

  get wrong() {
    return this.input.length ?
    !this.text.words[this.next].startsWith(this.input)
    : false
  }

  @Watch('input')
  onInputChange(value: string) {
    const totalWords = this.text.words.length

    if (!this.playing) {
      this.playing = true
      this.$store.dispatch('startTimer')
    }

    // user has not finished typing all the words
    if (this.next < totalWords) {
      const last = this.next === totalWords - 1
      const word = this.text.words[this.next]

      // completed typing a word
      if (value === `${word} ` || last && value === word) {
        this.userText += value
        this.input = ''
        this.next++
        this.$store.dispatch('updateCompletedText', this.userText)
      }
    } else {
      this.playing = false
      this.$store.dispatch('stopTimer')
    }
  }

  cssClasses(i) {
    return {
      next: this.next === i,
      incorrect: this.next === i && this.wrong,
      correct: this.next > i
    }
  }
}
