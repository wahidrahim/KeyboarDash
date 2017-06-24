<template lang="html">
  <div class="race">
    <div class="road">
      <div class="track" ref="track">
        <div class="car" :style="moveCar()">
          <car :width="carWidth"></car>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./race.ts"></script>
<style lang="scss" src="./race.scss" scoped></style>
