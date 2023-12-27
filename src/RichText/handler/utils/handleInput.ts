import { TextAtom } from '@Kernel/Store/TextStore'
import { RichText } from '@RichText/RichText'

function handleInsertText(richText: RichText, atom: TextAtom) {
  richText.insert(atom)
}

export function handleInput(inputType: string, richText: RichText, atom: TextAtom) {
  const handlers: { [key: string]: (richText: RichText, atom: TextAtom) => void } = {
    insertText: handleInsertText,
  }
  handlers[inputType](richText, atom)
}
