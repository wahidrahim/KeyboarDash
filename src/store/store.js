import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: 'If you want to become life sensitive, a simple process that you do is this: make whatever you think and whatever you feel less important. Try and see for one day. Suddenly you will feel the breeze, the rain, the flowers and the people, everything in a completely different way. Suddenly the life in you becomes much more active and alive for your experience.',
    source: 'Sadhguru Jaggi Vasudev',
    completedText: '',
    timer: {
      timeElapsed: 0,
      startTime: null,
      clock: null,
      start() {
        this.startTime = moment()
        this.clock = setInterval(() => {
          this.timeElapsed = moment().diff(this.startTime, 'milliseconds')
        }, 1)
      },
      stop() {
        clearInterval(this.clock)
      }
    }
  },
  getters: {
    originalText(state) {
      return state.text
    },
    textSource(state) {
      return state.source
    },
    completedText(state) {
      return state.completedText
    },
    timeElapsed(state) {
      return state.timer.timeElapsed
    },
    speed(state) {
      const mins = state.timer.timeElapsed / 60000
      const standardWords = state.completedText.length / 5
      const speed = mins ? standardWords / mins : 0

      return speed
    },
    percentageCompleted(state) {
      return state.completedText.length / state.text.length * 100
    },
    finished(state) {
      return state.completedText === state.text
    }
  },
  mutations: {
    completedText(state, completedText) {
      state.completedText = completedText
    },
    newText(state, random) {
      state.text = random.text
      state.source = random.source
    },
    startTimer(state) {
      state.timer.start()
    },
    stopTimer(state) {
      state.timer.stop()
    }
  }
})
