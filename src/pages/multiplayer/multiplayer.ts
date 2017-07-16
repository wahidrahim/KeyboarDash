import { Vue, Component } from 'vue-property-decorator'
import io from 'socket.io-client'

interface Message {
  player: string
  text: string
}

interface Player {
  id: string
  name: string
  color: string
}

const socket = io()

@Component({
  name: 'MultiPlayer'
})
export default class MultiPlayer extends Vue {
  messages: Message[] = []
  players: Player[] = []
  player: Player = {
    id: undefined,
    name: undefined,
    color: undefined
  }
  showNameInputModal = true

  $refs: {
    nameInput: HTMLInputElement,
    messageInput: HTMLInputElement
  }

  created() {
    socket.on('updatePlayer', (player) => {
      this.player = player
    })

    socket.on('updatePlayers', (players) => {
      this.players = players
    })

    socket.on('message', (message) => {
      this.messages.push(message)
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
}
// import { Vue, Component } from 'vue-property-decorator'
// import { mapGetters } from 'vuex'
// import axios from 'axios'
//
// import WordTyper from 'components/wordTyper'
// import Race from 'components/race'
// import Name from 'components/getNameModal'
// import SaveScore from 'components/saveScoreModal'
//
// import io from 'socket.io-client'
//
// // needs to be a class
// interface Player {
//   name: string
// }
//
// @Component({
//   name: 'MultiPlayer',
//   components: {
//     WordTyper,
//     Race,
//     SaveScore,
//     Name
//   },
//   computed: {
//     ...mapGetters({
//       playing: 'timeElapsed',
//       finished: 'finished'
//     })
//   }
// })
// export default class MultiPlayer extends Vue {
//   socket = io()d
//   loading: boolean = false
//   showNameInputModal: boolean = true
//
//   created() {
//
//   }
//
// }
