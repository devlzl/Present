import { RichText } from '@RichText/RichText'
import { nextTick } from 'vue'

export interface Selection {
  index: number
  length: number
}

export class SelectionHandler {
  richText: RichText
  _selection = { index: 0, length: 0 }

  constructor(richText: RichText) {
    this.richText = richText
  }

  private async _updateNativeSelection() {
    await nextTick()
    const { index: selectionIndex, length: selectionLength } = this._selection
    const richTextElement = this.richText.element as HTMLElement
    const atomElements = richTextElement.querySelectorAll('.atom') as NodeListOf<HTMLElement>

    let startNode: Node | null = null
    let startOffset = 0
    let endNode: Node | null = null
    let endOffset = 0
    let currentIndex = 0
    for (const atomElement of atomElements) {
      const textNode = atomElement.childNodes[0] as Text
      const textLength = textNode.length
      if (!startNode && currentIndex + textLength >= selectionIndex) {
        startNode = textNode
        startOffset = selectionIndex - currentIndex
      }
      if (!endNode && currentIndex + textLength >= selectionIndex + selectionLength) {
        endNode = textNode
        endOffset = selectionIndex + selectionLength - currentIndex
      }
      currentIndex += textLength
    }
    startNode = startNode ?? richTextElement
    endNode = endNode ?? richTextElement
    const range = new Range()
    range.setStart(startNode, startOffset)
    range.setEnd(endNode, endOffset)

    const nativeSelection = window.getSelection()
    if (nativeSelection?.rangeCount) {
      const currentRange = nativeSelection.getRangeAt(0)
      nativeSelection.removeRange(currentRange)
    }
    nativeSelection?.addRange(range)
  }

  getSelection() {
    return { ...this._selection }
  }

  setSelectionByInput(selection: Selection) {
    this._selection = selection
    this._updateNativeSelection()
  }

  setSelectionByNative() {
    const range = document.getSelection()?.getRangeAt(0) as Range
    const { startContainer, startOffset, endContainer, endOffset } = range
    const richTextElement = this.richText.element as HTMLElement
    const atomElements = richTextElement.querySelectorAll('.atom')
    let selectionIndex = 0
    let selectionLength = 0
    let currentIndex = 0
    for (const atomElement of atomElements) {
      const textNode = atomElement.childNodes[0] as Text
      if (textNode === startContainer) {
        selectionIndex = currentIndex + startOffset
      }
      if (textNode === endContainer) {
        selectionLength = currentIndex + endOffset - selectionIndex
        break
      }
      currentIndex += textNode.length
    }
    this._selection = {
      index: selectionIndex,
      length: selectionLength,
    }
  }
}
