<template lang="html">
  <div class="multiplayer">
    <div class="get-name-modal" v-show="showNameInputModal">
      <div class="header">
        Name
        <span class="close" @click="showNameInputModal = false">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <input type="text" @keyup.enter="updateName" ref="nameInput" :value="player.name">
    </div>

    <div v-show="!showNameInputModal">
      <div class="wrapper">
        <word-typer @completedWord="completedWord"></word-typer>
      </div>

      <race v-for="player in players" :complete="player.completed"></race>
    </div>

    <button type="button" name="button" @click="toggleTimer" v-if="player.isLeader">start</button>
    <h4>{{ countDown }}</h4>
    {{ time | formatTime }}
    {{ speed }}

    <div class="chat" style="display: none;">
      <div class="header">
        Connected as: [{{ player.name }}]
        <span style="float: right">{{ players.length }} players connected</span>
      </div>
      <div class="wrap">
        <ul class="messages">
          <li v-for="message in messages">
            <span
            class="name"
            v-if="message.player"
            :style="{ color: message.player.color }">
            {{ message.player.name }}:&nbsp;</span>
            <span :class="{server: !message.player}">
              {{ message.text }}
            </span>
          </li>
        </ul>
        <input type="text" @keyup.enter="sendMessage" ref="messageInput">
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./multiplayer.ts"></script>
<style lang="scss" src="./multiplayer.scss" scoped></style>
