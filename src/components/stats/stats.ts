import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters({
      speed: 'speed',
      time: 'timeElapsed'
    })
  }
})
export default class Stats extends Vue {
}
