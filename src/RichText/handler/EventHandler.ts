import { type RichText } from '@RichText/RichText'
import { handleInput } from './utils/handleInput'
import { sleep } from '@Utils/sleep'

export class EventHandler {
  richText: RichText
  _isCurrentElement: boolean = false
  _isComposing: boolean

  constructor(richText: RichText) {
    this.richText = richText
    this._isComposing = false
  }

  onSelectionChange() {
    const range = document.getSelection()?.getRangeAt(0) as Range
    this._isCurrentElement = range.intersectsNode(this.richText.element as HTMLElement)
    if (!this._isCurrentElement) {
      return
    }
    if (this._isComposing) {
      // prevent modify inner selection by native selection change
      return
    }
    this.richText.setSelectionByNative()
  }

  onBeforeInput(event: InputEvent) {
    if (!this._isCurrentElement) {
      return
    }
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
    if (!this._isCurrentElement) {
      return
    }
    this._isComposing = true
  }

  onCompositionEnd(event: CompositionEvent) {
    if (!this._isCurrentElement) {
      return
    }
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

  mount() {
    const element = this.richText.element as HTMLElement
    element.addEventListener('focus', () => (this.richText.focus = true))
    element.addEventListener('blur', async () => {
      await sleep(100)
      this.richText.focus = false
    })
    element.addEventListener('beforeinput', this.onBeforeInput.bind(this))
    element.addEventListener('compositionstart', this.onCompositionStart.bind(this))
    element.addEventListener('compositionend', this.onCompositionEnd.bind(this))
    document.addEventListener('selectionchange', this.onSelectionChange.bind(this))
  }
}
