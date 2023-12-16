import { Slide } from './Slide'
import { TextBoxModel } from './ElementModels/TextBoxModel'

export class Store {
  private _slides: Array<Slide> = []
  private _currentIndex: number = 0

  constructor() {
    const slide = new Slide([new TextBoxModel(100, 50)])
    this._slides.push(slide)
  }

  get currentSlide() {
    return this._slides[this._currentIndex]
  }

  get slides() {
    return this._slides
  }
}
