<template>
  <div class="container">
    <div id="app">
      <word-list :class="{loading}"></word-list>
      <race></race>
      <div class="stats">
        <speed></speed>
        <time-elapsed></time-elapsed>
      </div>
    </div>
  </div>
</template>

<script>
import WordList from './components/wordList.vue'
import Race from './components/race.vue'
import TimeElapsed from './components/timeElapsed.vue'
import Speed from './components/speed.vue'

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
  created() {
    const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    this.loading = true

    this.$http.get(url).then((res) => {
      if (!res.body) {
        this.loading = false
        return
      } else {
        const text = res.body.quoteText.trim()
        const source = res.body.quoteAuthor

        this.$store.commit('randomText', { text, source })
        this.loading = false
      }
    }, (err) => {
      this.loading = false
    })
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
