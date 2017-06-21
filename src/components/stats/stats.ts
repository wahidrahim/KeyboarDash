export default {
  computed: {
    speed() {
      return this.$store.getters.speed.toFixed(2)
    },
    time() {
      return this.$store.getters.timeElapsed
    }
  }
}
