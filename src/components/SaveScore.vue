<template lang="html">
  <div class="save-score-modal">
    <div class="save">
      <div class="header">
        Save score
        <span class="close" @click="close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <form @submit.prevent="save">
        <input type="text" v-model="name" @click="selectText" ref="nameInput">
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Anonymous'
    }
  },
  computed: {
    speed() {
      return this.$store.getters.speed
    },
    time() {
      return this.$store.getters.timeElapsed
    },
    text() {
      return this.$store.getters.originalText
    },
    source() {
      return this.$store.getters.textSource
    }
  },
  methods: {
    save() {
      const data = {
        name: this.name.length ? this.name : 'Anonymous',
        speed: this.speed,
        time: this.time,
        text: this.text,
        source: this.source,
        date: new Date().getTime()
      }

      this.$http.post('https://spidersunflower.firebaseio.com/scores.json', data).then((res) => {
        this.$router.push('scores')
      })
    },
    close() {
      this.$emit('close')
    },
    selectText() {
      this.$refs.nameInput.select()
    }
  },
  mounted() {
    this.selectText()
  }
}
</script>

<style lang="scss" scoped>
.save-score-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  font-family: sans-serif;

  .save {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 3px;
    border: 1px solid black;

    .header {
      padding: 10px;
      background: black;
      color: white;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;

      .close {
        float: right;
        color: lightgray;

        &:hover {
          color: white;
          cursor: pointer;
        }
      }
    }

    form {
      padding: 10px;

      input {
        border: 1px solid darkgray;
        border-radius: 3px;
        padding: 10px;
        font-size: 16px;
      }

      button {
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 3px;
        border: 1px solid darkgray;
        background: white;

        &:hover {
          background: whitesmoke;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
