import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SaveScore extends Vue {
  @Prop()
  value: string

  $refs: { nameInput: HTMLInputElement }

  save() {
    let name = this.value
    this.$emit('input', name)
  }

  close() {
    this.$emit('close')
  }

  selectText() {
    this.$refs.nameInput.select()
  }

  mounted() {
    this.selectText()
  }
}
