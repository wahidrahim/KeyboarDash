import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Component } from 'vue-property-decorator'

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
