<template lang="html">
  <div class="multiplayer">
    <div class="get-name-modal" v-show="showNameInputModal">
      <div class="header">
        Name
        <span class="close" @click="updateName">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <input type="text" @keyup.enter="updateName" ref="nameInput" :value="player.name">
    </div>

    <div class="chat">
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
<!-- <template lang="html">
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
<div class="header">Chat - {{ players.length }} joined</div>
<div class="wrap">
<ul>
<li v-for="msg in messages">
<span v-if="msg.player"><strong>{{ msg.player }}</strong>: </span>{{ msg.text }}
</li>
</ul>
<input type="text" @keyup.enter="sendMessage" v-model="message">
</div>
</div>
</div>
</template> -->

<script lang="ts" src="./multiplayer.ts"></script>
<style lang="scss" src="./multiplayer.scss" scoped></style>
