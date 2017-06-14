<template lang="html">
  <div class="scores">
    <h1>Past Scores</h1>
    <div v-for="score in scores" class="score">
      <div class="time">{{ score.at }}</div>
      <div class="name">{{ score.name }}</div>
      <div>{{ score.speed.toFixed(2) }} WPM in {{ score.time | formatTime }}</div>
      <div></div>
      <p class="text">{{ score.text }}</p>
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
    const url = 'https://spidersunflower.firebaseio.com/scores.json'

    this.$http.get(url).then((res) => {
      this.scores = JSON.parse(res.bodyText)
      // console.log(this.scores)
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

    .name {
      font-weight: bold;
    }

    .time {
      float: right;
    }

    .text {
      font-family: serif;
    }
  }
}
</style>
