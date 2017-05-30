<template lang="html">
  <div class="word-list">
    <div class="text-container">
      <div class="words">
        <span v-for="word, i in wordArray" :class="['word', cssClasses(i)]">
          {{ word }}
        </span>
      </div>
      <div class="source">{{ this.text.source ? `— ${this.text.source}` : '' }}</div>
    </div>
    <input type="text" v-model="input" autofocus></input>
  </div>
</template>

<script>
import { Bus } from '../main.js'

export default {
  props: {
    // TODO combine source and text into one object
    text: {
      default: () => {
        return {
          words: 'If you want to become life sensitive, a simple process that you do is this: make whatever you think and whatever you feel less important. Try and see for one day. Suddenly you will feel the breeze, the rain, the flowers and the people, everything in a completely different way. Suddenly the life in you becomes much more active and alive for your experience.',
          source: 'Sadhguru Jaggi Vasudev'
        }
      }
    }
  },
  data () {
    return {
      input: '',
      userText: '',
      next: 0,
      playing: false
    }
  },
  computed: {
    wordArray() {
      return this.text.words.split(' ')
    },
    totalWords() {
      return this.wordArray.length
    },
    completedChars() {
      return this.userText.length
    },
    totalCompleted() {
      return this.userText.length / this.text.words.length
    },
    wrong() {
      return this.input.length ? !this.wordArray[this.next].startsWith(this.input) : false
    }
  },
  watch: {
    input: function(value) {
      if (!this.playing) { this.playing = true }

      // not finished typing all the words
      if (this.next < this.totalWords) {
        const last = this.next === this.totalWords - 1
        const word = this.wordArray[this.next]

        // completed typing a word
        if (value === `${word} ` || last && value === word) {
          this.userText += value
          this.input = ''
          this.next++

          Bus.$emit('progress', {
            completedChars: this.completedChars,
            totalCompleted: this.totalCompleted
          })

        }
      } else {
        this.playing = false
      }
    },
    playing: (is) => {
      if (is) {
        Bus.$emit('started')
      } else {
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
  &.loading {
    position: relative;

    &:before {
      content: 'loading...';
      position: absolute;
      top: 3px;
      left: 5px;
    }
  }

  .text-container {
    .words {
      border: 1px solid black;
      border-radius: 3px;
      padding: 10px 20px;
      display: flex;
      flex-wrap: wrap;
      background: white;;
      @include font-style(32px);

      .word {
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

    .source {
      text-align: right;
      font-style: italic;
      min-height: 15px;
    }
  }
  input {
    @include font-style(32px);
    width: 100%;
    border: 1px solid black;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 5px 15px;
    // margin-top: 15px;
    outline: none;

    &:focus {
    }
  }
}
</style>
