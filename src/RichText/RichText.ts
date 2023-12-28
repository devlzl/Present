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
}
