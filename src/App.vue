<template>
    <div class="container">
        <div id="app">
            <word-list :text="text"></word-list>
            <speed :speed="speed"></speed>
            <time-elapsed :seconds="seconds"></time-elapsed>
        </div>
    </div>
</template>

<script>
import WordList from './components/wordList.vue'
import TimeElapsed from './components/timeElapsed.vue'
import Speed from './components/speed.vue'

import { Bus } from './main.js'

export default {
    name: 'app',
    components: {
        WordList,
        TimeElapsed,
        Speed
    },
    data() {
        return {
            text: undefined,
            timer: null,
            seconds: 0,
            correctWords: 0
        }
    },
    computed: {
        speed() {
            let mins = this.seconds / 60

            return mins ? this.correctWords / mins : 0
        }
    },
    created() {
        Bus.$on('started', () => {
            this.timer = setInterval(() => {
                this.seconds++
            }, 1000)
        })

        Bus.$on('correctWord', (num) => {
            this.correctWords = num
        })

        Bus.$on('finished', () => {
            clearInterval(this.timer)
        })
    }
}
</script>

<style lang="scss">
.container {
    max-width: 720px;
    margin: 0 auto;
}
</style>
