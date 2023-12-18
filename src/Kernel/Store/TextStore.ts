import { EventManager } from '@Kernel/EventManager'

export class TextStore {
  private _store: string = ''

  events = {
    update: new EventManager<{ oldText: string; newText: string }>(),
  }

  get length() {
    return this._store.length
  }

  insert(index: number, text: string) {
    const oldText = this._store
    const left = this._store.slice(0, index)
    const right = this._store.slice(index)
    const newText = left + text + right
    this._store = newText
    this.events.update.emit({ oldText, newText })
  }

  toPlain(): string {
    return this._store
  }
}
