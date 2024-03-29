import { EventManager } from '@Kernel/EventManager'
import { isStoreType } from './_Store'
import type { FullType, OriginArray, OriginType, StoreType } from './_Store'

export class ArrayStore {
  private _store: Array<FullType> = []

  events = {
    update: new EventManager<{
      index: number
      from: Array<FullType>
      to: Array<FullType>
    }>(),
  }

  get length() {
    return this._store.length
  }

  get(index: number) {
    return this._store[index]
  }

  slice(index: number) {
    return this._store.slice(index)
  }

  insert(index: number, ...values: Array<FullType>) {
    const from = [] as Array<FullType>
    const to = values
    this._store.splice(index, 0, ...values)
    this.events.update.emit({ index, from, to })
  }

  push(...value: Array<FullType>) {
    this.insert(this._store.length, ...value)
  }

  delete(index: number, length: number) {
    const from = this._store.splice(index, length)
    const to = [] as Array<FullType>
    this.events.update.emit({ index, from, to })
  }

  toPlain(): OriginArray {
    return this._store.map((value) => {
      if (isStoreType(value)) {
        return (value as StoreType).toPlain()
      }
      return value as OriginType
    })
  }

  [Symbol.iterator] = () => {
    const self = this
    return {
      index: 0,
      next() {
        if (this.index < self._store.length) {
          return { done: false, value: self._store[this.index++] }
        } else {
          return { done: true }
        }
      },
    }
  }
}
