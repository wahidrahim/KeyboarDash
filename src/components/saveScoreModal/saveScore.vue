<template lang="html">
  <div class="save-score-modal">
    <div class="save">
      <div class="header">
        Save score
        <span class="close" @click="close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <form @submit.prevent="save">
        <input type="text" v-model="name" @click="selectText" ref="nameInput">
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./saveScore.ts"></script>
<style lang="scss" src="./saveScore.scss" scoped></style>
