import { EventManager } from '@Kernel/EventManager'
import type { FullType, OriginMap, StoreType } from './_Store'
import { isStoreType } from './_Store'
import { Command } from '@Kernel/HistoryManager'
import { history } from '@Kernel/index'

export class MapStore {
  private _store: { [key: string]: FullType } = Object.create(null)

  events = {
    update: new EventManager<{ key: string; from: FullType; to: FullType }>(),
  }

  private _set(key: string, value: FullType) {
    const from = this._store[key]
    const to = value
    this._store[key] = value
    this.events.update.emit({ key, from, to })
  }

  private _delete(key: string) {
    const from = this._store[key]
    const to = undefined
    delete this._store[key]
    this.events.update.emit({ key, from, to })
  }

  get(key: string): FullType {
    return this._store[key]
  }

  set(key: string, value: FullType) {
    const oldValue = this.get(key)
    const command = new Command(
      () => this._set(key, value),
      () => this._set(key, oldValue)
    )
    history.exec(command)
  }

  delete(key: string) {
    const oldValue = this.get(key)
    const command = new Command(
      () => this._delete(key),
      () => this._set(key, oldValue)
    )
    history.exec(command)
  }

  toPlain(): OriginMap {
    const result = Object.create(null)
    for (const [key, value] of Object.entries(this._store)) {
      if (isStoreType(value)) {
        result[key] = (value as StoreType).toPlain()
      } else {
        result[key] = value
      }
    }
    return result
  }
}
