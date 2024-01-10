import type { AttributeValue, TextStore, Attributes, AttributeName } from '@Kernel/Store/TextStore'
import { Selection, SelectionHandler } from './handler/SelectionHandler'
import { EventHandler } from './handler/EventHandler'
import { EventManager } from '@Kernel/EventManager'
import { richTextObserver } from '@Kernel/index'

export interface RichTextController {
  isFocus(): boolean
  getCommonAttributes(): Attributes
  format(name: AttributeName, value: AttributeValue): void
}

export class RichText {
  element?: HTMLElement
  focus: boolean = false
  textStore: TextStore
  eventHandler = new EventHandler(this)
  selectionHandler = new SelectionHandler(this)

  getSelection = this.selectionHandler.getSelection.bind(this.selectionHandler)
  setSelectionByInput = this.selectionHandler.setSelectionByInput.bind(this.selectionHandler)
  setSelectionByNative = this.selectionHandler.setSelectionByNative.bind(this.selectionHandler)

  events = {
    selectChange: new EventManager<Selection>(),
    formatChange: new EventManager<Selection>(),
  }

  constructor(textStore: TextStore) {
    this.textStore = textStore
    this.events.selectChange.on((selection) => {
      const atoms = textStore.getAtoms(selection.index, selection.length)
      richTextObserver.emit({
        selection: selection,
        atoms: atoms,
      })
    })
    this.events.formatChange.on((selection) => {
      const atoms = textStore.getAtoms(selection.index, selection.length)
      richTextObserver.emit({
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
      isFocus: () => {
        return this.focus
      },
      getCommonAttributes: () => {
        return this.textStore.commonAttributes
      },
      format: (name: AttributeName, value: AttributeValue) => {
        const selectedLength = this.getSelection().length
        let { index, length } = this.getSelection()
        if (selectedLength === 0) {
          index = 0
          length = this.textStore.length
        }
        this.textStore.format(index, length, {
          [name]: value,
        })
        if (selectedLength > 0) {
          this.setSelectionByInput({ index, length })
        }
        this.events.formatChange.emit({ index, length })
      },
    }
  }
}
