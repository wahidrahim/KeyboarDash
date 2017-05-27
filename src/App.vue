<template>
    <div class="container">
        <div id="app">
            <div class="words" v-html="htmlWords"></div>
            <textarea type="text" v-model="input"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',

    data () {
        return {
            input: '',
            words: 'You must be shapeless, formless, like water. When you pour water in a cup, it becomes the cup. When you pour water in a bottle, it becomes the bottle. When you pour water in a teapot, it becomes the teapot. Water can drip and it can crash. Become like water my friend.'
        }
    },

    computed: {
        htmlWords() {
            let words = this.words.split(' ')
            let userWords = this.input.split(' ')
            let nextWord = userWords.length - 1

            // all previous words can be either 'correct' or 'incorrect'
            // the current word can be 'next' or 'incorrect'
            //     the current word is only 'incorrect' when

            return words.map((word, i) => {
                if (i < nextWord) {
                    if (userWords[i] === word) {
                        return `<span class="correct">${word}</span>`
                    } else {
                        return `<span class="incorrect">${word}</span>`
                    }
                } else if (i === nextWord) {
                    if (userWords[i] === '' || words[i].startsWith(userWords[i])) {
                        return `<span class="next">${word}</span>`
                    } else {
                        return `<span class="incorrect">${word}</span>`
                    }
                } else {
                    return `<span>${word}</span>`
                }
            }).join(' ')
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

    textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 5px 15px;
        margin-top: 15px;
        @include font-style(24px);

    }
}
</style>
