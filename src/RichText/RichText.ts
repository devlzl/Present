import { TextAtom, type TextStore } from '@Kernel/Store/TextStore'
import { SelectionHandler } from './handler/SelectionHandler'
import { EventHandler } from './handler/EventHandler'

export class RichText {
  element?: HTMLElement
  textStore: TextStore
  eventHandler = new EventHandler(this)
  selectionHandler = new SelectionHandler(this)

  getSelection = this.selectionHandler.getSelection.bind(this.selectionHandler)
  setSelectionByInput = this.selectionHandler.setSelectionByInput.bind(this.selectionHandler)
  setSelectionByNative = this.selectionHandler.setSelectionByNative.bind(this.selectionHandler)

  constructor(textStore: TextStore) {
    this.textStore = textStore
  }

  mount(element: HTMLElement) {
    this.element = element
    this.eventHandler.mount()
  }

  insert(atom: TextAtom) {
    const { index, length } = this.getSelection()
    if (length > 0) {
      this.textStore.delete(index, length)
    }
    this.textStore.insert(index, atom)
    this.setSelectionByInput({
      index: index + atom.text.length,
      length: 0,
    })
  }

  delete() {
    const { index, length } = this.getSelection()
    this.textStore.delete(index, length)
    this.setSelectionByInput({
      index: index - length,
      length: 0,
    })
  }
}
