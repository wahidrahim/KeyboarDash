<template lang="html">
  <div class="race">
    <div class="road">
      <div class="car" :style="moveCar()">
        <svgicon icon="racing" width="100" height="100" color="white" stroke-width="7"></svgicon>
      </div>
    </div>
    <!-- <div class="progress-bar">
    <div class="progress" :style="raceState()"></div>
    </div> -->
</div>
</template>

<script lang="ts" src="./race.ts"></script>
<style lang="scss" src="./race.scss" scoped></style>
