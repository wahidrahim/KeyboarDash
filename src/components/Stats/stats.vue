<template lang="html">
  <div class="stats">
    <div class="speed">
      {{ speed ? speed : '000.00' }} WPM
    </div>
    <div class="time-elapsed">
      {{ time | formatTime }}
    </div>
  </div>
</template>

<script src="./stats.ts"></script>
<style lang="scss" src="./stats.scss" scoped></style>
