<template lang="html">
  <div class="scores">
    <h1>
      Scoreboard
    </h1>
    <!-- <button @click="speed">speed</button> -->
    <div v-for="score in scores" class="score">
      <div class="date">
        <i class="fa fa-calendar" aria-hidden="true"></i>
        {{ score.date | dateFormat('YYYY-MM-DD') }}
        &nbsp;
        <i class="fa fa-clock-o" aria-hidden="true"></i>
        {{ score.date | dateFormat('HH:mm:ss') }}
      </div>
      <!-- {{ score.date | dateFormat('YYYY-MM-DD') }}</div> -->
      <div class="stats">
        <span class="speed">{{ score.speed.toFixed(2) }} WPM</span> in {{ score.time | formatTime }}
      </div>
      <div class="name">
        <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
        <i class="fa fa-keyboard-o" aria-hidden="true"></i>
        {{ score.name }}
      </div>
      <p class="text">
        {{ score.text }}
      </p>
      <div class="source">
        — {{ score.source }}
      </div>
    </div>
  </div>
</template>

<script>
import scores from '../database/db'

export default {
  name: 'Scores',
  data() {
    return {
      orderBy: 'date',
      scoresRef: null,
      scores: []
    }
  },
  computed: {
    orderedScores() {
    }
  },
  created() {
    this.scores = scores()
  },
  methods: {
    speed() {
      this.scores = scores('speed')
    }
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
      font-size: 16px;
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
