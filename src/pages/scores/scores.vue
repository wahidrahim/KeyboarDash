<template lang="html">
  <div class="scores">
    <h1>
      Scoreboard
    </h1>
    <span class="home" @click="home">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
      Back
    </span>
    <div class="sorts">
      <label>
        <input type="radio" name="sortBy" @click="sortBy('date')" checked>
        Date
      </label>
      <label>
        <input type="radio" name="sortBy" @click="sortBy('speed')">
        Speed
      </label>
      <label>
        <input type="radio" name="sortBy" @click="sortBy('name')">
        Name
      </label>
    </div>
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

<script lang="ts" src="./scores.ts"></script>
<style lang="scss" src="./scores.scss" scoped></style>
