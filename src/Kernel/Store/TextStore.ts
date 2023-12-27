import { EventManager } from '@Kernel/EventManager'
import type { CommandFn, Command } from '@Kernel/HistoryManager'
import { history } from '@Kernel/index'

class ChangeTextCommand implements Command {
  action: CommandFn
  inverse: CommandFn
  constructor(action: CommandFn, inverse: CommandFn) {
    this.action = action
    this.inverse = inverse
  }
}

export interface TextAtom {
  text: string
  attributes: {
    [key: string]: string | boolean
  }
}

export class TextStore {
  private _store: Array<TextAtom> = []

  events = {
    update: new EventManager<{ newAtoms: Array<TextAtom> }>(),
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
          attributes: { ...atom.attributes, ...newAtom.attributes },
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
    this.events.update.emit({ newAtoms: this.atoms })
  }

  private _insertAtoms(index: number, newAtoms: Array<TextAtom>) {
    for (const atom of newAtoms) {
      this._insertAtom(index, atom)
      index += atom.text.length
    }
  }

  private _deleteAtom(index: number, length: number) {
    let currentIndex = 0
    for (let i = 0; i < this._store.length; i++) {
      let atom = this._store[i]
      if (currentIndex <= index && index < currentIndex + atom.text.length) {
        const delta = index - currentIndex
        const deletedLength = atom.text.slice(delta).length
        if (deletedLength >= length) {
          this._store.splice(i, 1, {
            text: atom.text.slice(delta + length),
            attributes: atom.attributes,
          })
          break
        } else {
          atom.text = atom.text.slice(delta)
          index += deletedLength
          length -= deletedLength
        }
      }
      currentIndex += atom.text.length
    }
    this.events.update.emit({ newAtoms: this.atoms })
  }

  private _slice(index: number, length: number): Array<TextAtom> {
    const atoms = structuredClone(this._store)
    const result: Array<TextAtom> = []
    let currentIndex = 0
    for (let i = 0; i < atoms.length; i++) {
      let atom = atoms[i]
      if (currentIndex <= index && index < currentIndex + atom.text.length) {
        const delta = index - currentIndex
        const deletedLength = atom.text.slice(delta).length
        if (deletedLength >= length) {
          result.push({
            text: atom.text.slice(0, length),
            attributes: atom.attributes,
          })
          break
        } else {
          result.push({
            text: atom.text.slice(delta),
            attributes: atom.attributes,
          })
          index += deletedLength
          length -= deletedLength
        }
      }
      currentIndex += atom.text.length
    }
    return result
  }

  get length() {
    return this._store.reduce((length, atom) => length + atom.text.length, 0)
  }

  get atoms() {
    // prevent modify _store directly and make vue update view
    return this._store.slice()
  }

  insert(index: number, atom: TextAtom) {
    const command = new ChangeTextCommand(
      () => this._insertAtom(index, atom),
      () => this._deleteAtom(index, atom.text.length)
    )
    history.exec(command)
  }

  delete(index: number, length: number) {
    const deletedAtom = this._slice(index, length)
    const command = new ChangeTextCommand(
      () => this._deleteAtom(index, length),
      () => this._insertAtoms(index, deletedAtom)
    )
    history.exec(command)
  }

  format(index: number, length: number, attributes: { [key: string]: string | boolean }) {
    // TODO: with history
    const left = this._slice(0, index)
    const target = this._slice(index, length)
    const right = this._slice(index + length, this.length - index - length)
    target.forEach((atom) => {
      atom.attributes = { ...atom.attributes, ...attributes }
    })
    this._store = [...left, ...target, ...right]
    this.events.update.emit({ newAtoms: this.atoms })
  }

  toPlain(): string {
    return this._store.reduce((text, current) => text + current.text, '')
  }
}
