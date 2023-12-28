import { type RichText } from '@RichText/RichText'
import { handleInput } from './utils/handleInput'

export class EventHandler {
  richText: RichText
  _isComposing: boolean

  constructor(richText: RichText) {
    this.richText = richText
    this._isComposing = false
  }

  onBeforeInput(event: InputEvent) {
    event.preventDefault()
    if (this._isComposing) {
      return
    }
    const { inputType, data } = event
    handleInput(inputType, this.richText, {
      text: data as string,
      attributes: {},
    })
  }

  onCompositionStart() {
    this._isComposing = true
  }

  onCompositionEnd(event: CompositionEvent) {
    this._isComposing = false
    const data = event.data
    // https://github.com/w3c/input-events/issues/137
    const range = window.getSelection()?.getRangeAt(0) as Range
    range.setStart(range.startContainer, range.startOffset - data.length)
    range.deleteContents()
    handleInput('insertText', this.richText, {
      text: data,
      attributes: {},
    })
  }

  onSelectionChange() {
    if (this._isComposing) {
      // prevent modify inner selection by native selection change
      return
    }
    this.richText.setSelectionByNative()
  }

  mount() {
    const element = this.richText.element as HTMLElement
    element.addEventListener('beforeinput', this.onBeforeInput.bind(this))
    element.addEventListener('compositionstart', this.onCompositionStart.bind(this))
    element.addEventListener('compositionend', this.onCompositionEnd.bind(this))
    document.addEventListener('selectionchange', this.onSelectionChange.bind(this))
  }
}
