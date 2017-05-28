<template>
    <div class="container">
        <div id="app">
            <div class="words">
                <span v-for="word, i in words" :class="cssClasses(i)">
                    {{ word }}
                </span>
            </div>
            <input type="text" v-model="input" autofocus></input>

            <speed :speed="speed"></speed>
            <time-elapsed :time="seconds"></time-elapsed>
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
            input: '',
            userWords: [],
            wrong: false,
            next: 0,
            seconds: 0,
            timer: null
        }
    },
    created() {
        const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

        this.$http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080'
        this.$http.headers.common['Access-Control-Request-Method'] = '*'

        this.$http.get(url, (res) => {
            console.log(res)
        }, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Request-Method': '*'
            }
        })
    },
    computed: {
        words() { return this.text.split(' ') },
        speed() {
            let mins = this.seconds / 60

            return mins ? (this.next / mins).toFixed(1) : 0
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

body {
    background: #2A2D34;
}

.container {
    max-width: 960px;
    margin: 0 auto;
}

#app {
    .words {
        border: 1px solid black;
        border-radius: 3px;
        padding: 10px 20px;
        display: flex;
        flex-wrap: wrap;
        background: #FCFCFC;

        span {
            @include font-style(32px);

            &.next {
                border-bottom: 1px solid black;
            }

            &.correct {
                // color: #00FFC5;
                color: #00BA90;
            }

            &.incorrect {
                color: #ED254E;
            }

            &:not(:last-child) {
                margin-right: 12px;
            }
        }
    }

    input {
        width: 100%;
        border: 1px solid black;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 5px 15px;
        margin-top: 15px;
        outline: none;
        @include font-style(32px);

        &:focus {
            border: 1px solid #2AAEFF;
        }
    }
}
</style>
