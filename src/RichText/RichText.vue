<script setup lang="ts">
import { type TextStore } from '@Kernel/Store/TextStore'
import { ref } from 'vue'
import Atom from './Atom.vue'
import { RichText } from './RichText'
import { onMounted } from 'vue'

const { textStore } = defineProps<{
  textStore: TextStore
}>()

const richText = new RichText(textStore)
const richTextRef = ref<HTMLElement | null>(null)
onMounted(() => {
  richText.mount(richTextRef.value as HTMLElement)
})

const atoms = ref(textStore.atoms)
textStore.events.update.on(({ newAtoms }) => {
  // TODO: will be remove filter after implement `compact`
  atoms.value = newAtoms.filter((atom) => atom.text.length > 0)
})

const handleBold = () => {
  const { index, length } = richText.getSelection()
  textStore.format(index, length, {
    bold: true,
  })
}

const handleItalic = () => {
  const { index, length } = richText.getSelection()
  textStore.format(index, length, {
    italic: true,
  })
}

const handleUnderline = () => {
  const { index, length } = richText.getSelection()
  textStore.format(index, length, {
    underline: true,
  })
}

const color = ref('#000000')
const handleColor = (event: Event) => {
  const { index, length } = richText.getSelection()
  textStore.format(index, length, {
    color: (event.target as HTMLInputElement).value,
  })
}
</script>

<template>
  <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="handleBold">bold</button>
  <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="handleItalic">
    italic
  </button>
  <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="handleUnderline">
    underline
  </button>
  <input type="color" v-model="color" @input="handleColor" />

  <div ref="richTextRef" contenteditable="true" class="focus:outline-none">
    <Atom v-for="atom of atoms" :atom="atom" />
  </div>
</template>
