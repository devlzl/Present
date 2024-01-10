import { TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { HistoryManager } from './HistoryManager'
import { Slide } from './Slide'
import { TableBlock } from '@BlockHub/TableBlock/TableBlock'
import { PictureBlock } from '@BlockHub/PictureBlock/PictureBlock'
import { BlockSelection } from './BlockSelection'
import { EventManager } from './EventManager'
import { TextAtom } from './Store/TextStore'
import { SlideManager } from './SlideManager'
import { ToolBox } from './ToolBox/ToolBox'

interface RichTextStateChange {
  selection: {
    index: number
    length: number
  }
  atoms: Array<TextAtom>
}

export type SlideMode = 'edit' | 'start' | 'current'

export const slideManager = new SlideManager([
  new Slide([new TextBoxBlock(100, 50), new TableBlock(400, 300, 4, 3), new PictureBlock(100, 300)]),
  new Slide([new TextBoxBlock(100, 300)]),
  new Slide([new TextBoxBlock(400, 300)]),
])

export const richTextObserver = new EventManager<RichTextStateChange>()

export const history = new HistoryManager()

export const selectionBlk = new BlockSelection()

export const slideShowMode = new EventManager<SlideMode>()

export const toolBox = new ToolBox()
