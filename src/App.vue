<template>
  <div class="container">
    <div id="app">
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <!-- <word-typer :class="{loading}"></word-typer>
      <race></race>
      <div class="stats" v-show="finished">
        <speed></speed>
        <time-elapsed></time-elapsed>
      </div>
      <div class="graph">
        <speed-graph></speed-graph>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body {
  margin: 15px;
  background: slategray;
}

.container {
  max-width: 720px;
  margin: 0 auto;
}

#app {

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
