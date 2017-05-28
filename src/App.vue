<template>
    <div class="container">
        <div id="app">
            <div class="words">
                <span v-for="word, i in words" :class="cssClasses(i)">
                    {{ word }}
                </span>
            </div>
            <input type="text" v-model="input" autofocus></input>

            <time-elapsed :time="seconds"></time-elapsed>
            <speed :speed="speed"></speed>
        </div>
    </div>
</template>

<script>
import TimeElapsed from './components/timeElapsed.vue'
import Speed from './components/speed.vue'

export default {
    name: 'app',
    components: {
        TimeElapsed,
        Speed
    },
    data () {
        return {
            text: 'We know from science that nothing in the universe exists as an isolated or independent entity.',
            userWords: [],
            input: '',
            next: 0,
            wrong: false,
            seconds: 0,
            timer: null
        }
    },
    computed: {
        words() { return this.text.split(' ') },
        speed() {
            let mins = this.seconds / 60

            return mins ? (this.next / mins).toFixed(2) : 0
        }
    },
    watch: {
        input: function(input) {
            if (!this.timer) {
                this.timer = setInterval(() => this.seconds++, 1000)
            }
            if (this.next < this.words.length) {
                this.wrong = !this.words[this.next].startsWith(input)

                const last = this.next === this.words.length - 1
                const word = this.words[this.next]

                if (input === `${word} ` || last && input === word){
                    this.userWords.push(word.trim())
                    this.input = ''
                    this.next++
                }
            } else {
                clearInterval(this.timer)
            }
        }
    },
    methods: {
        cssClasses(i) {
            return {
                next: this.next === i,
                incorrect: this.next === i && this.wrong,
                correct: this.next > i
            }
        }
    }
}
</script>

<style lang="scss">
@mixin font-style($unit) {
    font-family: serif;
    font-size: $unit;
    word-spacing: $unit / 2;
    line-height: $unit * 1.5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

#app {
    .words {
        border: 1px solid #DCDCDC;
        padding: 5px 15px;
        display: flex;
        flex-wrap: wrap;

        span {
            @include font-style(24px);

            &.next {
                text-decoration: underline;
            }

            &.correct {
                color: green;
            }

            &.incorrect {
                color: red;
            }

            &:not(:last-child) {
                margin-right: 12px;
            }
        }
    }

    input {
        width: 100%;
        box-sizing: border-box;
        padding: 5px 15px;
        margin-top: 15px;
        @include font-style(24px);
    }
}
</style>
