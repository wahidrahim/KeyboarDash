<template>
  <div class="container">
    <div id="app">
      <word-list :text="text" :source="source" :class="{loading}"></word-list>
      <race :progress="progress" :speed="speed"></race>
      <div class="stats">
        <speed :speed="speed"></speed>
        <time-elapsed :seconds="seconds"></time-elapsed>
      </div>
    </div>
  </div>
</template>

<script>
import WordList from './components/wordList.vue'
import Race from './components/race.vue'
import TimeElapsed from './components/timeElapsed.vue'
import Speed from './components/speed.vue'

import { Bus } from './main.js'

export default {
  name: 'app',
  components: {
    WordList,
    Race,
    TimeElapsed,
    Speed
  },
  data() {
    return {
      text: '',
      source: '',
      timer: null,
      seconds: 0,
      correctWords: 0,
      progress: 0,
      loading: true
    }
  },
  computed: {
    speed() {
      let mins = this.seconds / 60

      return mins ? this.correctWords / mins : 0
    }
  },
  created() {
    let url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    this.$http.get(url).then((res) => {
      let text = res.body.quoteText.trim()
      let source = res.body.quoteAuthor

      this.loading = false
      this.text = text
      this.source = source
    }, (err) => {
      this.text = undefined
      this.loading = false
    })

    Bus.$on('started', () => {
      this.timer = setInterval(() => {
        this.seconds++
      }, 1000)
    })

    Bus.$on('correctWord', (data) => {
      this.correctWords = data.corrects,
      this.progress = data.progress * 100
    })

    Bus.$on('finished', () => {
      clearInterval(this.timer)
    })
  }
}
</script>

<style lang="scss">
.container {
  max-width: 720px;
  margin: 0 auto;
}

#app {
  .stats {
    position: absolute;
    top: 3px;
    left: 8px;
    font-family: sans-serif;
  }
}
</style>
