<template lang="html">
  <div class="race">
    <div class="progress-bar">
      <div class="progress" :style="raceState()"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./race.ts"></script>
<style lang="scss" src="./race.scss" scoped></style>
