<template>
    <div class="container">
        <div id="app">
            <div class="words" v-html="htmlWords.join(' ')"></div>
            <input type="text" v-model="input">
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',

    data () {
        return {
            input: '',
            words: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni sit repellendus deleniti facilis numquam illo aliquam accusamus sint assumenda repudiandae incidunt exercitationem qui doloribus vitae fuga, esse dolore iure. Rerum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum odio ipsa in velit officia quasi nulla placeat error! Illum atque excepturi, consequatur dolor eos consectetur est quam laborum iure et.'
        }
    },

    computed: {
        htmlWords() {
            let nextWord = this.input.split(' ').length - 1
            console.log(nextWord)

            return this.words.split(' ').map((word, i) => {
                if (i === nextWord) {
                    return `<span class="next">${word}</span>`
                } else {
                    return `<span>${word}</span>`
                }
            })
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
                color: green;
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
