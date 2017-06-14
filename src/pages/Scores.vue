<template lang="html">
  <div class="scores">
    <div v-for="score in scores">
      <h3>{{ score.name }}</h3>
      <div class="time">{{ score.at }}</div>
      <div>{{ score.speed.toFixed(2) }} WPM</div>
      <div>{{ score.time | formatTime }}</div>
      <p>{{ score.text }}</p>
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
      console.log(this.scores)
    })
  }
}
</script>

<style lang="scss" scoped>
.scores {
  ul {
    list-style-type: none;
  }
}
</style>
