import { type RichText } from '@RichText/RichText'
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
    const rowElements = richTextElement.querySelectorAll('.row') as NodeListOf<HTMLElement>

    let startNode: Node | null = null
    let startOffset = 0
    let endNode: Node | null = null
    let endOffset = 0
    let currentIndex = 0
    for (const rowElement of rowElements) {
      const atomElements = rowElement.querySelectorAll('.atom')
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
      if (!startNode && currentIndex >= selectionIndex) {
        startNode = rowElement
        startOffset = selectionIndex - currentIndex
      }
      if (!endNode && currentIndex >= selectionIndex + selectionLength) {
        endNode = rowElement
        endOffset = selectionIndex + selectionLength - currentIndex
      }
      currentIndex += 1
    }
    startNode = startNode ?? rowElements[0]
    endNode = endNode ?? rowElements[0]
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
    const rowElements = richTextElement.querySelectorAll('.row')
    let selectionIndex = 0
    let selectionLength = 0
    let currentIndex = 0
    outer: for (const rowElement of rowElements) {
      const atomElements = rowElement.querySelectorAll('.atom')
      for (const atomElement of atomElements) {
        const textNode = atomElement.childNodes[0] as Text
        if (textNode === startContainer) {
          selectionIndex = currentIndex + startOffset
        }
        if (textNode === endContainer) {
          selectionLength = currentIndex + endOffset - selectionIndex
          break outer
        }
        currentIndex += textNode.length
      }
      if (rowElement === startContainer) {
        selectionIndex = currentIndex + startOffset
      }
      if (rowElement === endContainer) {
        selectionLength = currentIndex + endOffset - selectionIndex
        break
      }
      currentIndex += 1
    }
    this._selection = {
      index: selectionIndex,
      length: selectionLength,
    }
  }
}
