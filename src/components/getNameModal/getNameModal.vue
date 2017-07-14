<template lang="html">
  <div class="get-name-modal">
    <div class="save">
      <div class="header">
        Name
        <span class="close" @click="close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <form @submit.prevent="save">
        <input type="text" :value="value" @click="selectText" ref="nameInput">
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./getNameModal.ts"></script>
<style lang="scss" src="./getNameModal.scss" scoped></style>
