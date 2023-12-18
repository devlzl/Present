interface EventCalback<T> {
  (data: T): void
}

export class EventManager<T> {
  private _callbacks: Array<EventCalback<T>> = []

  on(callback: EventCalback<T>) {
    this._callbacks.push(callback)
  }

  emit(data: T) {
    this._callbacks.forEach((callback) => callback(data))
  }
}
