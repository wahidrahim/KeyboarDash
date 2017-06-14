<template lang="html">
  <div class="single-player">
    <word-typer :class="{loading}"></word-typer>
    <race></race>
    <div class="stats" v-show="finished">
      <speed></speed>
      <time-elapsed></time-elapsed>
    </div>
    <button class="btn-save" @click="save">Save</button>
    <div class="graph">
      <speed-graph></speed-graph>
    </div>
  </div>
</template>

<script>
import WordTyper from '../components/wordTyper.vue'
import Race from '../components/race.vue'
import TimeElapsed from '../components/timeElapsed.vue'
import Speed from '../components/speed.vue'
import SpeedGraph from '../components/SpeedGraph.vue'

export default {
  name: 'SinglePlayer',
  components: {
    WordTyper,
    Race,
    TimeElapsed,
    Speed,
    SpeedGraph
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

        this.$store.commit('newText', { text, source })
        this.loading = false
      }
    }, (err) => {
      this.loading = false
    })
  },
  methods: {
    save() {
      this.$router.push('scores')
    }
  }
}
</script>

<style lang="scss" scoped>
.single-player {
  .stats {
    font-family: sans-serif;
    text-align: center;
  }

  .btn-save {
    // outline: none;
    border: 1px solid black;
    font-size: 16px;
    border-radius: 3px;
    background: lightskyblue;
  }
}
</style>
