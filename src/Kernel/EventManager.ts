interface EventCallback<T> {
  (data: T): void
}

export class EventManager<T> {
  private _callbacks: Array<EventCallback<T>> = []

  on(callback: EventCallback<T>) {
    this._callbacks.push(callback)
  }

  emit(data?: T) {
    // data?: T           // make the `data` optional
    // as NonNullable<T>  // no need to check if `data` is undefined in the callback
    this._callbacks.forEach((callback) => callback(data as NonNullable<T>))
  }
}
