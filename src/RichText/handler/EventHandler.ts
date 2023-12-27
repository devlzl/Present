import { type RichText } from '@RichText/RichText'
import { handleInput } from './utils/handleInput'

export class EventHandler {
  richText: RichText

  constructor(richText: RichText) {
    this.richText = richText
  }

  onBeforeInput(event: InputEvent) {
    event.preventDefault()
    const { inputType, data } = event
    handleInput(inputType, this.richText, {
      text: data as string,
      attributes: {},
    })
  }

  onSelectionChange() {
    this.richText.setSelectionByNative()
  }

  mount() {
    const element = this.richText.element as HTMLElement
    element.addEventListener('beforeinput', this.onBeforeInput.bind(this))
    document.addEventListener('selectionchange', this.onSelectionChange.bind(this))
  }
}
