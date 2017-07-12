import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import axios from 'axios'

import WordTyper from 'components/wordTyper'
import Race from 'components/race'
import SaveScore from 'components/saveScoreModal'

import io from 'socket.io-client'

interface Player {
  name: string
}

@Component({
  name: 'MultiPlayer',
  components: {
    WordTyper,
    Race,
    SaveScore
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
  showSaveScore: boolean = false
  players: {}[] = []
  player: Player = {
    name: ''
  }

  created() {
    if (!this.player.name.length) {
      const name = prompt('name', 'Anonymous')

      this.player.name = name.length ? name : 'Anonymous'
    }

    this.socket.emit('updatePlayer', this.player)
    this.socket.on('updatePlayers', (players) => {
      console.log(players)
    })
  }
}
