<template lang="html">
  <div class="word-typer">
    <div class="text-container">
      <div class="words">
        <span v-for="word, i in text.words" :class="['word', cssClasses(i)]">
          {{ word }}
        </span>
      </div>
      <div class="source">{{ text.source ? `— ${text.source}` : '' }}</div>
    </div>
    <input v-show="!loading" type="text" v-model="input" autofocus></input>
  </div>
</template>

<script lang="ts" src="./wordTyper.ts"></script>
<style lang="scss" src="./wordTyper.scss" scoped></style>
