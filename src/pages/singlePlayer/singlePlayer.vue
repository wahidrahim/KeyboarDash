<template>
  <div class="single-player">
    <div class="wrapper">
      <word-typer :class="{loading}" :loading="loading"></word-typer>
      <race></race>
      <stats v-show="finished"></stats>
      <button class="btn-save" v-show="finished" @click="saveScore = true">
        Save
      </button>
    </div>
    <!-- NOTE: width = wrapper width / 2 -->
    <!-- This is to line up the graph's svg stroke with other components -->
    <!-- Hack? Maybe. Aesthetic? Yes. -->
    <speed-graph :width="718" :height="449"></speed-graph>
    <save-score v-if="saveScore" @close="saveScore = false"></save-score>
  </div>
</template>

<script lang="ts" src="./singlePlayer.ts"></script>
<style lang="scss" src="./singlePlayer.scss" scoped></style>
