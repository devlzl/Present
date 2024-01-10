import { EventManager } from './EventManager'
import { Slide } from './Slide'

export class SlideManager {
  private _slides: Array<Slide> = []
  private _currentIndex = 0

  events = {
    update: new EventManager(),
  }

  constructor(slides: Array<Slide> = [new Slide()]) {
    this._slides = slides
  }

  get currentIndex() {
    return this._currentIndex
  }

  get currentSlide() {
    return this._slides[this._currentIndex]
  }

  get slides() {
    return this._slides.slice()
  }

  insertSlide(index: number = this._currentIndex + 1) {
    this._slides.splice(index, 0, new Slide())
    this.events.update.emit()
  }

  changeSlide(index: number) {
    this._currentIndex = index
    this.events.update.emit()
  }

  move(originIndex: number, targetIndex: number) {
    if (originIndex === targetIndex) {
      return
    }
    const target = this._slides.splice(originIndex, 1)[0]
    this._slides.splice(targetIndex, 0, target)
    this.events.update.emit()
  }

  goNext() {
    if (this._currentIndex + 1 < this._slides.length) {
      this._currentIndex += 1
      this.events.update.emit()
    }
  }

  goPrevious() {
    if (this._currentIndex - 1 >= 0) {
      this._currentIndex -= 1
      this.events.update.emit()
    }
  }
}
