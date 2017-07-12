<template lang="html">
  <div class="multiplayer">
    <div class="wrapper">
      <word-typer :class="{loading}" :loading="loading"></word-typer>
    </div>
    <div v-for="player in players">
      {{ player.name }}
    </div>
  </div>
</template>

<script lang="ts" src="./multiplayer.ts"></script>

<style lang="scss" src="./multiplayer.scss" scoped></style>
