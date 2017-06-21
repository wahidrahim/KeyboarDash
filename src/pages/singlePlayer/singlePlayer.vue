<template>
  <div class="single-player">
    <word-typer :class="{loading}" :loading="loading"></word-typer>
    <race></race>
    <stats v-show="finished"></stats>
    <button class="btn-save" v-show="finished" @click="saveScore = true">Save</button>
    <speed-graph :width="565" :height="353"></speed-graph>
    <save-score v-if="saveScore" @close="saveScore = false"></save-score>
  </div>
</template>

<script src="./singlePlayer.ts"></script>
<style lang="scss" src="./singlePlayer.scss" scoped></style>
