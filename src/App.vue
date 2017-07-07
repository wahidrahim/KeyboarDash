<template>
  <div class="container">
    <div id="app">
      <transition>
        <router-view></router-view>
      </transition>
      <h1>Players Connected: {{ playersCount }}</h1>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

const socket = io()


export default {
  name: 'app',
  data() {
    return {
      playersCount: 0
    }
  },
  created() {
    socket.on('updatePlayersCount', (count) => {
      this.playersCount = count
    })
  }
}
</script>

<style src="./styles/styles.scss"></style>
