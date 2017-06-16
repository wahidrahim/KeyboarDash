<template lang="html">
  <div class="scores">
    <h1>Scoreboard</h1>
    <div v-for="score, index in scores" :key="-index" class="score">
      <div class="date">{{ score.date | dateFormat }}</div>
      <div class="stats"><span class="speed">{{ score.speed.toFixed(2) }} WPM</span> in {{ score.time | formatTime }}</div>
      <div class="name">{{ score.name }}</div>
      <div></div>
      <p class="text">{{ score.text }}</p>
      <div class="source">— {{ score.source }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scores',
  data() {
    return {
      scores: {}
    }
  },
  created() {
    const url = 'https://spidersunflower.firebaseio.com/scores.json?orderByKey=speed'

    this.$http.get(url).then((res) => {
      this.scores = JSON.parse(res.bodyText)
    })
  }
}
</script>

<style lang="scss" scoped>
.scores {
  font-family: sans-serif;

  h1 {
    color: white;
  }

  .score {
    background: white;
    border-radius: 3px;
    padding: 10px 20px;
    font-size: 18px;
    border: 1px solid black;
    margin-bottom: 10px;

    .name {
      // font-weight: bold;
      font-size: 24px;
    }

    .stats {
      font-size: 20px;

      .speed {
        font-size: 28px;
        font-weight: bold;
      }
    }

    .date {
      float: right;
    }

    .text {
      font-family: serif;
      font-size: 20px;
      margin-bottom: 0;
    }

    .source {
      text-align: right;
      font-style: italic;
      font-family: serif;
    }
  }
}
</style>
