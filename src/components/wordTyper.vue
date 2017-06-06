<template lang="html">
  <div class="word-typer">
    <div class="text-container">
      <div class="words">
        <span v-for="word, i in text.words" :class="['word', cssClasses(i)]">
          {{ word }}
        </span>
      </div>
      <div class="source">{{ text.source ? `— ${text.source}` : '' }}</div>
    </div>
    <input type="text" v-model="input" autofocus></input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      userText: '',
      next: 0,
      playing: false
    }
  },
  computed: {
    text() {
      return {
        words: this.$store.getters.originalText.split(' '),
        source: this.$store.getters.textSource
      }
    },
    wrong() {
      return this.input.length ?
      !this.text.words[this.next].startsWith(this.input)
      : false
    }
  },
  watch: {
    input(value) {
      const totalWords = this.text.words.length

      if (!this.playing) {
        this.playing = true
        this.$store.commit('startTimer')
      }

      // user has not finished typing all the words
      if (this.next < totalWords) {
        const last = this.next === totalWords - 1
        const word = this.text.words[this.next]

        // completed typing a word
        if (value === `${word} ` || last && value === word) {
          this.userText += value
          this.input = ''
          this.next++
          this.$store.commit('completedText', this.userText)
        }
      } else {
        this.playing = false
        this.$store.commit('stopTimer')
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
  word-spacing: 4px;
  font-size: $unit;
  line-height: $unit * 1.5;
}

.word-typer {
  &.loading {
    position: relative;

    .word, .source {
      display: none;
    }

    input {
      margin-top: 15px;
    }

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
    padding: 10px 20px;
    outline: none;

    &:focus {
    }
  }
}
</style>
