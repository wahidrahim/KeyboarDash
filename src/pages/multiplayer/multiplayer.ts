import { Vue, Component, Watch } from 'vue-property-decorator'
import io from 'socket.io-client'
import axios from 'axios'
import WordTyper from 'components/wordTyper'
import Race from 'components/race'

interface Message {
  player: string
  text: string
}

interface Player {
  id: string
  name: string
  color: string
  isLeader: boolean
  completed: number
}

const socket = io()

@Component({
  name: 'MultiPlayer',
  components: {
    WordTyper,
    Race
  }
})
export default class MultiPlayer extends Vue {
  messages: Message[] = []
  players: Player[] = []
  player: Player = {
    id: undefined,
    name: undefined,
    color: undefined,
    isLeader: false,
    completed: 0
  }
  showNameInputModal = true
  loading = false
  countDown = 5

  $refs: {
    nameInput: HTMLInputElement,
    messageInput: HTMLInputElement
  }

  get time() {
    return this.$store.getters.timeElapsed
  }

  get speed() {
    return this.$store.getters.speed
  }

  // @Watch('players', { deep: true })
  // onPlayersUpdate() {
  //   if (this.players[0].id === this.player.id) {
  //     this.player.isLeader = true
  //
  //     axios.get('/api/randomQuote')
  //     .then((res) => {
  //       this.$store.dispatch('reset', {
  //         text: res.data.quoteText.trim(),
  //         source: res.data.quoteAuthor.trim()
  //       })
  //
  //       socket.emit('words', {
  //         text: res.data.quoteText.trim(),
  //         source: res.data.quoteAuthor.trim()
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //     .then(() => {
  //       this.loading = false
  //     })
  //   }
  // }

  created() {
    socket.on('updatePlayer', (player) => {
      this.player = player
    })

    socket.on('updatePlayers', (players) => {
      this.players = players
      this.players.map((p) => {
        console.log(p.completed)
      })
    })

    socket.on('words', (words) => {
      this.$store.dispatch('reset', words)
    })

    socket.on('message', (message) => {
      this.messages.push(message)
    })

    socket.on('toggleTimer', (time) => {
      if (this.time > 0) {
        this.$store.dispatch('stopTimer')
      }

      let i = setInterval(() => {
        this.countDown--

        if (this.countDown === 0) {
          this.$store.dispatch('startTimer')
          clearInterval(i)
        }
      }, 1000)
    })
  }

  sendMessage() {
    const msg = this.$refs.messageInput.value

    if (msg.length) {
      socket.send({
        player: this.player,
        text: msg
      })
      this.$refs.messageInput.value = ''
    }
  }

  updateName() {
    const name = this.$refs.nameInput.value

    if (name.length) {
      this.player.name = name
      socket.emit('updatePlayer', this.player)
    }

    this.showNameInputModal = false
  }

  toggleTimer() {
    socket.emit('toggleTimer')
  }

  completedWord(completedText) {
    console.log(this.$store.getters.percentageCompleted)
    this.$store.dispatch('updateCompletedText', completedText)
    socket.emit('completedText', {
      id: this.player.id,
      completed: this.$store.getters.percentageCompleted
    })
  }
}
