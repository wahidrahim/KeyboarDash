<template lang="html">
  <div class="multiplayer">
    <div class="get-name-modal" v-show="showNameInputModal">
      <div class="save">
        <div class="header">
          Name
          <span class="close" @click="showNameInputModal = false">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
        <form>
          <input type="text" v-model="player.name" @keyup.enter="updateName">
        </form>
      </div>
    </div>

    <div class="wrapper">
      <word-typer :class="{loading}" :loading="loading"></word-typer>
    </div>

    <div class="chat">
      <ul>
        <li v-for="msg in messages">
          <span v-if="msg.player"><strong>{{ msg.player }}</strong>: </span>{{ msg.text }}
        </li>
      </ul>
      <input type="text" @keyup.enter="sendMessage" v-model="message">
    </div>
  </div>
</template>

<script lang="ts" src="./multiplayer.ts"></script>

<style lang="scss" src="./multiplayer.scss" scoped></style>
