<template>
  <div class="container">
    <div id="app">
      <word-typer :class="{loading}"></word-typer>
      <race></race>
      <div class="stats">
        <speed></speed>
        <time-elapsed></time-elapsed>
      </div>
      <save-modal v-if="finished"></save-modal>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import WordTyper from './components/WordTyper.vue'
import Race from './components/Race.vue'
import TimeElapsed from './components/TimeElapsed.vue'
import Speed from './components/Speed.vue'
import SaveModal from './components/SaveModal.vue'

export default {
  name: 'app',
  components: {
    WordTyper,
    Race,
    TimeElapsed,
    Speed,
    SaveModal
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    finished() {
      return this.$store.getters.finished
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

        this.$store.dispatch('updateText', { text, source })
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
  background: lightslategray;
  color: white;
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
