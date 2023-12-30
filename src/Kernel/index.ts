import { TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { HistoryManager } from './HistoryManager'
import { Slide } from './Slide'
import { TableBlock } from '@BlockHub/TableBlock/TableBlock'

export const kernel = {
  currentIndex: 0,
  slides: [new Slide([new TextBoxBlock(100, 50), new TableBlock(400, 300, 4, 3)])],

  get currentSlide() {
    return this.slides[this.currentIndex]
  },
}

export const history = new HistoryManager()
