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


.slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
    animation: slide-out 200ms ease-out forwards;

}

@keyframes slide-in {
    from {
        transform: translateX(-30px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1
    }
}

@keyframes slide-out {
    from {
        transform: translateX(0);
        opacity: 1;
    }

    to {
        transform: translateX(-30px);
        opacity: 0;
    }
}
</style>
