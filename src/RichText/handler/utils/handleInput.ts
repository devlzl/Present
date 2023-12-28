import { TextAtom } from '@Kernel/Store/TextStore'
import { RichText } from '@RichText/RichText'

function handleInsertText(richText: RichText, atom: TextAtom) {
  const { index, length } = richText.getSelection()
  if (length > 0) {
    richText.textStore.delete(index, length)
  }
  richText.textStore.insert(index, atom)
  richText.setSelectionByInput({
    index: index + atom.text.length,
    length: 0,
  })
}

function handleInsertParagraph(richText: RichText, atom: TextAtom) {
  const { index, length } = richText.getSelection()
  if (length > 0) {
    richText.textStore.delete(index, length)
  }
  richText.textStore.insert(index, {
    text: '\n',
    attributes: {},
  })
  richText.setSelectionByInput({
    index: index + 1,
    length: 0,
  })
}

function handleDeleteContentBackward(richText: RichText, atom: TextAtom) {
  const { index, length } = richText.getSelection()
  if (length === 0) {
    richText.textStore.delete(index - 1, 1)
    richText.setSelectionByInput({
      index: index - 1,
      length: 0,
    })
  } else {
    richText.textStore.delete(index, length)
    richText.setSelectionByInput({
      index: index,
      length: 0,
    })
  }
}

export function handleInput(inputType: string, richText: RichText, atom: TextAtom) {
  const handlers: { [key: string]: (richText: RichText, atom: TextAtom) => void } = {
    insertText: handleInsertText,
    insertParagraph: handleInsertParagraph,
    deleteContentBackward: handleDeleteContentBackward,
  }
  handlers[inputType](richText, atom)
}
