import { TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { HistoryManager } from './HistoryManager'
import { Slide } from './Slide'
import { SelectionManager } from './SelectionManager'
import { EventManager } from './EventManager'
import { TextAtom } from './Store/TextStore'
import { SlideManager } from './SlideManager'
import { ToolBox } from './ToolBox/ToolBox'
import { TEXT_BOX_DEFAULT_HEIGHT, TEXT_BOX_DEFAULT_WIDTH } from '@Const/block'
import { Zoom } from './Zoom'

interface RichTextStateChange {
  selection: {
    index: number
    length: number
  }
  atoms: Array<TextAtom>
}

export type SlideMode = 'edit' | 'start' | 'current'

export const history = new HistoryManager()

export const slideManager = new SlideManager([
  new Slide([new TextBoxBlock(330, 120, TEXT_BOX_DEFAULT_WIDTH, TEXT_BOX_DEFAULT_HEIGHT, 'center')]),
])

export const richTextObserver = new EventManager<RichTextStateChange>()

export const selectionManager = new SelectionManager()

export const slideShowMode = new EventManager<SlideMode>()

export const toolBox = new ToolBox()

export const zoom = new Zoom()
