<template>
  <div class="container">
    <div id="app">
      <word-list :text="text" :source="source" :class="{loading}"></word-list>
      <race :progress="percentageCompleted" :speed="speed"></race>
      <div class="stats">
        <speed :speed="speed"></speed>
        <time-elapsed :timer="timer"></time-elapsed>
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
      text: 'If you want to become life sensitive, a simple process that you do is this: make whatever you think and whatever you feel less important. Try and see for one day. Suddenly you will feel the breeze, the rain, the flowers and the people, everything in a completely different way. Suddenly the life in you becomes much more active and alive for your experience.',
      source: 'Sadhguru Jaggi Vasudev',
      completedText: '',
      loading: false,
      timer: {
        milliseconds: 0,
        init: null,
        clock: null,
        start() {
          this.init = moment()
          this.clock = setInterval(() => {
            this.milliseconds = moment().diff(this.init, 'milliseconds')
            // this.seconds = moment().diff(this.init, 'seconds')
            // this.seconds = Math.floor(this.milliseconds / 1000).toFixed(0)
            // console.log(moment().diff(this.init, 'milliseconds'))
          }, 1)
        },
        stop() {
          console.log('ms', this.milliseconds)
          clearInterval(this.clock)
        }
      },
    }
  },
  computed: {
    speed() {
      // const mins = this.timer.seconds / 60
      const mins = this.timer.milliseconds / 60000
      const standardWords = this.completedText.length / 5

      return mins ? (standardWords / mins).toFixed(3) : 0
    },
    percentageCompleted() {
      return this.completedText.length / this.text.length * 100
    }
  },
  created() {
    Bus.$on('updateProgress', (completedText) => {
      this.completedText = completedText
    })

    Bus.$on('started', () => {
      this.timer.start()
    })

    Bus.$on('finished', () => {
      this.timer.stop()
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
