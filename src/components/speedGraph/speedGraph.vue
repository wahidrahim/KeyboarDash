<template lang="html">
  <div id="graph">
    <svg class="graph" :width="width" :height="height">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(255, 0, 0, 0.5);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0, 0, 255, 0.8);stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- background -->
      <!-- <rect :width="width" :height="height" fill="white"></rect> -->
      <!-- x label -->
      <text class="axis-label"
      :x="width / 2 - 35"
      :y="height + 50">Seconds</text>
      <!-- x-axis -->
      <line class="x-axis"
      :x1="0"
      :y1="height"
      :x2="width"
      :y2="height"
      fill="none"
      stroke="black"></line><!-- end of x-axis -->
      <!-- x interval lines -->
      <line class="x-interval-lines interval-lines"
      v-for="i in maxXintervals"
      v-show="xInterval(i) <= width"
      :x1="xInterval(i)"
      :y1="height"
      :x2="xInterval(i)"
      :y2="0"></line>
      <!-- x interval labels -->
      <text class="time-label"
      v-for="i in maxXintervals"
      v-show="xInterval(i) <= width"
      :x="xInterval(i)"
      :y="height + 15">{{ xLabel(i) }}</text>
      <!-- y-axis -->
      <line class="y-axis"
      :x1="0"
      :y1="height"
      :x2="0"
      :y2="0"
      fill="none"
      stroke="black"></line><!-- end of y-axis -->
      <!-- y label -->
      <text class="axis-label"
      :transform="`rotate(-90 0 ${height / 2})`"
      :x="0"
      :y="height / 2 - 60">WPM</text>
      <!-- y interval lines -->
      <line class="y-interval-lines interval-lines"
      v-for="i in maxYintervals"
      v-show="maxValue > 0"
      :x1="0"
      :y1="yInterval(i)"
      :x2="width"
      :y2="yInterval(i)"></line>
      <!-- y interval labels -->
      <text class="value-label"
      text-anchor="end"
      v-for="i in maxYintervals"
      v-show="maxValue > 0"
      :x="-10"
      :y="yInterval(i)">{{ yLabel(i) }}</text>
      <!-- plotted line -->
      <polyline :points="plot" fill="url(#gradient)" stroke="black"></polyline>
      <!-- current value line -->
      <line class="current-value-line"
      stroke-dasharray="5, 5"
      v-show="maxValue > 0"
      fill="none"
      :x1="-50"
      :y1="valueLineHeight()"
      :x2="width"
      :y2="valueLineHeight()"></line>
      <!-- current value -->
      <text class="current-value"
      text-anchor="end"
      v-show="maxValue > 0"
      :x="-10"
      :y="valueLineHeight() - 3"
      fill="orangered">{{ value.toFixed(2) }}</text>
    </svg>
    <div class="waiting" v-if="!time">
      waiting for input<br>
    </div>
  </div>
</template>

<script src="./speedGraph.ts"></script>
<style lang="scss" src="./speedGraph.scss" scoped></style>
