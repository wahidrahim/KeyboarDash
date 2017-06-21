<template>
  <div class="container">
    <div id="app">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style src="./styles.scss"></style>
