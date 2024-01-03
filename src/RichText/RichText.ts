import type { AttributeValue, TextStore } from '@Kernel/Store/TextStore'
import { Selection, SelectionHandler } from './handler/SelectionHandler'
import { EventHandler } from './handler/EventHandler'
import { EventManager } from '@Kernel/EventManager'
import { kernel } from '@Kernel/index'

export interface RichTextController {
  format(name: string, value: AttributeValue): void
  formatAll(name: string, value: AttributeValue): void
}

export class RichText {
  element?: HTMLElement
  textStore: TextStore
  eventHandler = new EventHandler(this)
  selectionHandler = new SelectionHandler(this)

  getSelection = this.selectionHandler.getSelection.bind(this.selectionHandler)
  setSelectionByInput = this.selectionHandler.setSelectionByInput.bind(this.selectionHandler)
  setSelectionByNative = this.selectionHandler.setSelectionByNative.bind(this.selectionHandler)

  events = {
    selectChange: new EventManager<Selection>(),
  }

  constructor(textStore: TextStore) {
    this.textStore = textStore
    this.events.selectChange.on((selection) => {
      const atoms = textStore.getAtoms(selection.index, selection.length)
      kernel.richTextObserver.emit({
        selection: selection,
        atoms: atoms,
      })
    })
  }

  mount(element: HTMLElement) {
    this.element = element
    this.eventHandler.mount()
  }

  get controller(): RichTextController {
    return {
      format: (name: string, value: AttributeValue) => {
        const { index, length } = this.getSelection()
        this.textStore.format(index, length, {
          [name]: value,
        })
        this.setSelectionByInput({ index, length })
      },
      formatAll: (name: string, value: AttributeValue) => {
        const index = 0
        const length = this.textStore.length
        this.textStore.format(index, length, {
          [name]: value,
        })
        this.setSelectionByInput({ index, length })
      },
    }
  }
}
