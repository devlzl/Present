import { EventManager } from '@Kernel/EventManager'
import { FullType, OriginMap, StoreType, isStoreType } from './_Store'

export class MapStore {
  private _store: { [key: string]: FullType } = Object.create(null)

  events = {
    update: new EventManager<{ key: string; from: FullType; to: FullType }>(),
  }

  get(key: string): FullType {
    return this._store[key]
  }

  set(key: string, value: FullType) {
    const from = this._store[key]
    const to = value
    this._store[key] = value
    this.events.update.emit({ key, from, to })
  }

  delete(key: string) {
    const from = this._store[key]
    const to = undefined
    delete this._store[key]
    this.events.update.emit({ key, from, to })
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
