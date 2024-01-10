import { EventManager } from '@Kernel/EventManager'
import { Command } from '@Kernel/HistoryManager'
import { history } from '@Kernel/index'
import { intersectAttributes } from '@Utils/intersectAttributes'

export interface Attributes {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strike?: boolean
  color?: string
  background?: string
  fontFamily?: string
  fontSize?: number
}
export type AttributeName = keyof Attributes
export type AttributeValue = Attributes[keyof Attributes]

export interface TextAtom {
  text: string
  attributes: Attributes
}

export class TextStore {
  private _store: Array<TextAtom> = []

  events = {
    update: new EventManager<{ newAtoms: Array<TextAtom> }>(),
  }

  private _compact() {
    const result = []
    let currentAtom = this._store[0]
    for (let i = 1; i < this._store.length; i++) {
      const atom = this._store[i]
      if (atom.text.length === 0) {
        continue
      }

      if (atom.text === '\n') {
        result.push(currentAtom)
        currentAtom = atom
        continue
      }
      if (currentAtom.text === '\n') {
        result.push(currentAtom)
        currentAtom = this._store[i]
        continue
      }

      if (JSON.stringify(currentAtom.attributes) === JSON.stringify(atom.attributes)) {
        currentAtom.text += atom.text
      } else {
        result.push(currentAtom)
        currentAtom = this._store[i]
      }
    }
    // currentAtom might be undefined
    currentAtom && result.push(currentAtom)
    this._store = result
  }

  private _slice(index: number, length: number): Array<TextAtom> {
    const result: Array<TextAtom> = []
    if (length === 0) {
      return result
    }
    const atoms = structuredClone(this._store)
    let currentIndex = 0
    for (let i = 0; i < atoms.length; i++) {
      let atom = atoms[i]
      if (currentIndex <= index && index < currentIndex + atom.text.length) {
        const delta = index - currentIndex
        const slicedLength = atom.text.slice(delta).length
        if (slicedLength >= length) {
          result.push({
            text: atom.text.slice(delta, delta + length),
            attributes: atom.attributes,
          })
          break
        } else {
          result.push({
            text: atom.text.slice(delta),
            attributes: atom.attributes,
          })
          index += slicedLength
          length -= slicedLength
        }
      }
      currentIndex += atom.text.length
    }
    return result
  }

  private _insertAtom(index: number, newAtom: TextAtom) {
    newAtom = structuredClone(newAtom)
    let currentIndex = 0
    let inserted = false
    for (let i = 0; i < this._store.length; i++) {
      let atom = this._store[i]
      if (currentIndex <= index && index < currentIndex + atom.text.length) {
        const delta = index - currentIndex
        const a1 = {
          text: atom.text.slice(0, delta),
          attributes: atom.attributes,
        }
        const a2 = {
          text: newAtom.text,
          attributes: {
            ...newAtom.attributes,
            ...(delta > 0 ? atom.attributes : this._store[i - 1]?.attributes),
          },
        }
        const a3 = {
          text: atom.text.slice(delta),
          attributes: atom.attributes,
        }
        this._store.splice(i, 1, a1, a2, a3)
        inserted = true
        break
      }
      currentIndex += atom.text.length
    }
    if (!inserted) {
      this._store.push(newAtom)
    }
    this._compact()
    this.events.update.emit({ newAtoms: this.atoms })
  }

  private _insertAtoms(index: number, newAtoms: Array<TextAtom>) {
    for (const atom of newAtoms) {
      this._insertAtom(index, atom)
      index += atom.text.length
    }
  }

  private _deleteAtom(index: number, length: number) {
    const left = this._slice(0, index)
    const right = this._slice(index + length, this.length - index - length)
    this._store = [...left, ...right]
    this._compact()
    this.events.update.emit({ newAtoms: this.atoms })
  }

  private _formatAtoms(index: number, length: number, attributes: Attributes) {
    if (length === 0) {
      // controller.formatAll will invoke this no matter _store whether empty
      return
    }
    const left = this._slice(0, index)
    const target = this._slice(index, length)
    const right = this._slice(index + length, this.length - index - length)
    target.forEach((atom) => {
      atom.attributes = { ...atom.attributes, ...attributes }
    })
    this._store = [...left, ...target, ...right]
    this._compact()
    this.events.update.emit({ newAtoms: this.atoms })
  }

  private _unFormatAtoms(index: number, length: number, oldAtoms: Array<TextAtom>) {
    const left = this._slice(0, index)
    const right = this._slice(index + length, this.length - index - length)
    this._store = [...left, ...oldAtoms, ...right]
    this._compact()
    this.events.update.emit({ newAtoms: this.atoms })
  }

  get length() {
    return this._store.reduce((length, atom) => length + atom.text.length, 0)
  }

  get atoms() {
    // prevent modify _store directly and make vue update view
    return structuredClone(this._store)
  }

  get commonAttributes() {
    const attributesList = this.atoms.map((atom) => atom.attributes)
    return intersectAttributes(attributesList)
  }

  insert(index: number, atom: TextAtom) {
    const command = new Command(
      () => this._insertAtom(index, atom),
      () => this._deleteAtom(index, atom.text.length)
    )
    history.exec(command)
  }

  delete(index: number, length: number) {
    const deletedAtom = this._slice(index, length)
    const command = new Command(
      () => this._deleteAtom(index, length),
      () => this._insertAtoms(index, deletedAtom)
    )
    history.exec(command)
  }

  format(index: number, length: number, attributes: Attributes) {
    const oldAtoms = this._slice(index, length)
    const command = new Command(
      () => this._formatAtoms(index, length, attributes),
      () => this._unFormatAtoms(index, length, oldAtoms)
    )
    history.exec(command)
  }

  getAtoms(index: number, length: number) {
    return this._slice(index, length)
  }

  toPlain(): string {
    return this._store.reduce((text, current) => text + current.text, '')
  }
}
