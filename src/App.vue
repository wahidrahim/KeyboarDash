<template>
    <div class="container">
        <div id="app">
            <!-- <div class="words" v-html="htmlWords"></div> -->
            <div class="words">
                <span v-for="word, i in words"
                :class="{ next: next === i, incorrect: next === i && wrong, correct: next > i }">{{ word }}</span>
            </div>

            {{ seconds }}

            <br>
            {{ words }}
            <br>
            {{ userWords }}

            <input type="text" v-model="input"></input>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            text: 'hello world',
            userWords: [],
            input: '',
            next: 0,
            wrong: false,
            seconds: 0,
            startTime: false,
            timer: null
        }
    },
    computed: {
        words() { return this.text.split(' ') }
    },
    watch: {
        input: function(input) {
            if (this.next < this.words.length) {
                if (!this.startTime) {
                    this.startTime = true
                    this.timer = setInterval(() => this.seconds++, 1000)
                }

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
    }
}
</script>

<style lang="scss">
@mixin font-style($unit) {
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
