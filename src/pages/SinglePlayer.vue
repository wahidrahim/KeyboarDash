<template lang="html">
  <div class="single-player">
    <word-typer :class="{loading}"></word-typer>
    <race></race>
    <stats v-show="finished"></stats>
    <button class="btn-save" v-show="finished" @click="saveScore = true">Save</button>
    <speed-graph v-show="playing" :width="565" :height="353"></speed-graph>
    <save-score v-if="saveScore" @close="saveScore = false"></save-score>
  </div>
</template>

<script>
import WordTyper from '../components/WordTyper.vue'
import Race from '../components/Race.vue'
import Stats from '../components/Stats.vue'
import SpeedGraph from '../components/SpeedGraph.vue'
import SaveScore from '../components/SaveScore.vue'

export default {
  name: 'SinglePlayer',
  components: {
    WordTyper,
    Race,
    Stats,
    SpeedGraph,
    SaveScore
  },
  data() {
    return {
      loading: false,
      saveScore: false
    }
  },
  computed: {
    playing() {
      return this.$store.getters.timeElapsed
    },
    finished() {
      return this.$store.getters.finished
    }
  },
  created() {
    this.$store.dispatch('reset')

    const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    console.log('here')
    this.loading = true

    this.$http.get(url).then((res) => {
      if (!res.body) {
        this.loading = false
        return
      } else {
        const text = res.body.quoteText.trim()
        const source = res.body.quoteAuthor

        this.$store.dispatch('reset', { text, source })
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
    border: 1px solid black;
    font-size: 16px;
    border-radius: 3px;
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background: white;

    &:hover {
      background: whitesmoke;
      cursor: pointer;
    }
  }
}
</style>
