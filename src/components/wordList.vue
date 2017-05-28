<template lang="html">
  <div class="word-list">
    <div class="words">
      <span v-for="word, i in words" :class="cssClasses(i)">
        {{ word }}
      </span>
    </div>
    <input type="text" v-model="input" autofocus></input>
  </div>
</template>

<script>
import { Bus } from '../main.js'

export default {
  props: {
    text: {
      default: 'If you want to become life sensitive, a simple process that you do is this: make whatever you think and whatever you feel less important. Try and see for one day. Suddenly you will feel the breeze, the rain, the flowers and the people, everything in a completely different way. Suddenly the life in you becomes much more active and alive for your experience.',
      type: String
    }
  },
  data () {
    return {
      input: '',
      userWords: [],
      next: 0,
      wrong: false,
      playing: false
    }
  },
  computed: {
    words() { return this.text.split(' ') },
  },
  watch: {
    input: function(value) {
      let totalWords = this.words.length

      if (!this.playing) {
        this.playing = true
        Bus.$emit('started')
      }

      if (this.next < totalWords) {
        const last = this.next === totalWords - 1
        const word = this.words[this.next]

        if (value === `${word} ` || last && value === word){
          this.userWords.push(word.trim())
          this.input = ''
          this.next++
          Bus.$emit('correctWord', {
            corrects: this.next,
            progress: this.next / totalWords
          })
        } else {
          this.wrong = !this.words[this.next].startsWith(value)
        }
      } else {
        this.playing = false
        Bus.$emit('finished')
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

<style lang="scss" scoped>
@mixin font-style($unit) {
  font-family: serif;
  font-size: $unit;
  word-spacing: $unit / 2;
  line-height: $unit * 1.5;
}

.word-list {
  .words {
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    background: white;;

    span {
      @include font-style(32px);

      &.next {
        box-shadow: 0px 1px 0px 0px black;
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
    @include font-style(32px);
    width: 100%;
    border: 1px solid black;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 5px 15px;
    margin-top: 15px;
    outline: none;

    &:focus {
    }
  }
}
</style>
