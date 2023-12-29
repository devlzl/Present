<script setup lang="ts">
import type { TextAtom, TextStore } from '@Kernel/Store/TextStore'
import { ref, onMounted } from 'vue'
import { RichText, RichTextController } from './RichText'
import Row from './components/Row.vue'
import { history } from '@Kernel/index'

const { textStore, bindController } = defineProps<{
  textStore: TextStore
  bindController: (controller: RichTextController) => void
}>()

const richText = new RichText(textStore)
bindController(richText.controller)
const richTextRef = ref<HTMLElement | null>(null)
onMounted(() => {
  richText.mount(richTextRef.value as HTMLElement)
})

const atoms = ref(textStore.atoms)
textStore.events.update.on(({ newAtoms }) => {
  // TODO: will be remove filter after implement `compact`
  atoms.value = newAtoms.filter((atom) => atom.text.length > 0)
})
history.events.update.on((eventType) => {
  if (eventType === 'undo' || eventType === 'redo') {
    richText.setSelectionByInput({
      index: textStore.length,
      length: 0,
    })
  }
})

const rows = ref([] as Array<Array<TextAtom>>)
textStore.events.update.on(({ newAtoms }) => {
  rows.value = []
  let currentRow: Array<TextAtom> = []
  rows.value.push(currentRow)
  newAtoms.forEach((atom) => {
    if (atom.text !== '\n') {
      currentRow.push(atom)
    } else {
      currentRow = []
      rows.value.push(currentRow)
    }
  })
})
</script>

<template>
  <div ref="richTextRef" contenteditable="true" class="rich-text h-full focus:outline-none whitespace-break-spaces" spellcheck="false">
    <Row v-for="row of rows" :atoms="row" />
  </div>
</template>
