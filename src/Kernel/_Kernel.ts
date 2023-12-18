import { TextBoxModel } from './ElementModels/TextBoxModel'
import { Slide } from './Slide'
import { ArrayStore } from './Store/ArrayStore'
import { MapStore } from './Store/MapStore'

export class Kernel {
  private _state: MapStore

  constructor() {
    this._state = new MapStore()
    this._state.set('slides', this._initSlides())
    this._state.set('currentIndex', 0)
  }

  private _initSlides(): ArrayStore {
    const slides = new ArrayStore()
    const slide = new Slide([new TextBoxModel(100, 50)])
    slides.push(slide)
    return slides
  }

  get currentSlide(): Slide {
    const index = this._state.get('currentIndex') as number
    return (this._state.get('slides') as ArrayStore).get(index) as Slide
  }
}

export const kernel = new Kernel()
