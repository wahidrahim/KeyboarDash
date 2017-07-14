import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import axios from 'axios'

import WordTyper from 'components/wordTyper'
import Race from 'components/race'
import Name from 'components/getNameModal'
import SaveScore from 'components/saveScoreModal'

import io from 'socket.io-client'

// needs to be a class
interface Player {
  name: string
}

@Component({
  name: 'MultiPlayer',
  components: {
    WordTyper,
    Race,
    SaveScore,
    Name
  },
  computed: {
    ...mapGetters({
      playing: 'timeElapsed',
      finished: 'finished'
    })
  }
})
export default class MultiPlayer extends Vue {
  socket = io()
  loading: boolean = false
  showNameInputModal: boolean = true

  player = {
    name: '',
    id: ''
  }
  players = []

  message: string = ''

  messages: {
    name?: string,
    text: string
  }[] = []

  created() {
    this.socket.on('id', (id) => {
      this.player.id = id
      this.player.name = id
    })

    this.socket.on('updatePlayers', (players) => {
      this.players = players

      console.log(this.players)
    })

    this.socket.on('newMessage', (message) => {
      this.newMessage(message)
    })
     this.socket.on('updateMessages', (messages) => {
      this.updateMessages(messages)
    })
  }

  updateName() {
    this.showNameInputModal = false
    this.socket.emit('newPlayer', this.player)
    this.socket.emit('sendMessage', {
      text: `${this.player.name} has joined`
    })
  }

  sendMessage() {
    if (!this.message.length) return

    this.socket.emit('sendMessage', {
      player: this.player.name,
      text: this.message
    })

    this.message = ''
  }

  newMessage(message) {
    this.messages.push(message)
  }

  updateMessages(messages) {
    this.messages = messages
  }
}
