import { EventManager } from '@Kernel/EventManager'
import type { CommandFn, Command } from '@Kernel/HistoryManager'
import { history } from '@Kernel/_Kernel'

class ChangeTextCommand implements Command {
  action: CommandFn
  inverse: CommandFn
  constructor(action: CommandFn, inverse: CommandFn) {
    this.action = action
    this.inverse = inverse
  }
}
export class TextStore {
  private _store: string = ''

  events = {
    update: new EventManager<{ oldText: string; newText: string }>(),
  }

  get length() {
    return this._store.length
  }

  private _insertData(index: number, data: string) {
    const oldText = this._store
    const left = this._store.slice(0, index)
    const right = this._store.slice(index)
    const newText = left + data + right
    this._store = newText
    this.events.update.emit({ oldText, newText })
  }

  private _deleteData(index: number, length: number) {
    const oldText = this._store
    const newText =
      this._store.slice(0, index) + this._store.slice(index + length)
    this._store = newText
    this.events.update.emit({ oldText, newText })
  }

  insert(index: number, data: string) {
    const command = new ChangeTextCommand(
      () => this._insertData(index, data),
      () => this._deleteData(index, data.length)
    )
    history.exec(command)
  }

  delete(index: number, length: number) {
    const deletedData = this._store.slice(index, length)
    const command = new ChangeTextCommand(
      () => this._deleteData(index, length),
      () => this._insertData(index, deletedData)
    )
    history.exec(command)
  }

  toPlain(): string {
    return this._store
  }
}
