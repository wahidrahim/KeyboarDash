<template>
  <div class="container">
    <div id="app">
      <word-list :text="text" :source="source" :class="{loading}"></word-list>
      <race :progress="percentageCompleted" :speed="speed"></race>
      <div class="stats">
        <speed :speed="speed"></speed>
        <time-elapsed :timer="{ milliseconds: 0}"></time-elapsed>
      </div>
    </div>
  </div>
</template>

<script>
import WordList from './components/wordList.vue'
import Race from './components/race.vue'
import TimeElapsed from './components/timeElapsed.vue'
import Speed from './components/speed.vue'

import { Bus } from './main'

import moment from 'moment'

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
      loading: false
    }
  },
  computed: {
    // percentageCompleted() {
      // return this.completedText.length / this.text.length * 100
    // }
  },
  created() {
    Bus.$on('updateProgress', (completedText) => {
      this.$store.commit('completedText', completedText)
    })

    Bus.$on('started', () => {
      this.$store.state.timer.start()
    })

    Bus.$on('finished', () => {
      this.$store.state.timer.stop()
    })

    this.getRandomText()
  },
  methods: {
    getRandomText() {
      const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

      this.loading = true

      this.$http.get(url).then((res) => {
        if (!res.body) {
          this.loading = false
          return
        } else {
          const text = res.body.quoteText.trim()
          const source = res.body.quoteAuthor

          this.text = text
          this.source = source
          this.loading = false
        }
      }, (err) => {
        this.loading = false
      })

    }
  }
}
</script>

<style lang="scss">
body {
  margin: 15px;
}

.container {
  max-width: 720px;
  margin: 0 auto;
}

#app {
  .stats {
    font-family: sans-serif;
  }
}
</style>
