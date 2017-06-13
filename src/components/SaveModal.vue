<template lang="html">
  <div class="save-modal">
    <div class="modal">
      <div class="header">
        Save score?
        <a class="cancel" href="/">cancel</a>
      </div>
      <form>
        <input type="text" placeholder="Name" v-model="name">
        <button type="submit" name="button" @click.prevent="save">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      name: ''
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
    }
  },
  methods: {
    save() {
      const url = `https://spidersunflower.firebaseio.com/scores.json`
      const data = {
        name: this.name,
        speed: this.speed,
        time: this.time,
        text: this.text,
        at: moment()
      }

      this.$http.post(url, data).then((res) => {
        // refresh page
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.save-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  .modal {
    position: absolute;
    background: white;
    padding: 0 20px 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    color: black;
    font-family: sans-serif;

    .header {
      height: 40px;
      padding-top: 15px;
    }

    .cancel {
      color: dodgerblue;
      position: absolute;
      top: 6px;
      right: 8px;
      text-decoration: none;
      font-size: 12px;
      font-family: sans-serif;
    }

    input {
      padding: 10px;
      border-radius: 3px;
      outline: none;
      border: 1px solid black;
    }

    button {
      background: dodgerblue;
      border: 1px solid black;
      border-radius: 3px;
      padding: 10px;
      color: white;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
