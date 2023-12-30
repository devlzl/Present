import { TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { HistoryManager } from './HistoryManager'
import { Slide } from './Slide'
import { TableBlock } from '@BlockHub/TableBlock/TableBlock'
import { PictureBlock } from '@BlockHub/PictureBlock/PictureBlock'

export const kernel = {
  currentIndex: 0,
  slides: [new Slide([new TextBoxBlock(100, 50), new TableBlock(400, 300, 4, 3), new PictureBlock(100, 300)])],

  get currentSlide() {
    return this.slides[this.currentIndex]
  },
}

export const history = new HistoryManager()
