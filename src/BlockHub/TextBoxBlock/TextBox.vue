<script setup lang="ts">
import { shallowRef } from 'vue'
import { TextBoxBlock } from './TextBoxBlock'

const { block } = defineProps<{
  block: TextBoxBlock
}>()

const { x, y, width, height, text } = block

const onBeforeInput = (event: Event) => {
  // Vue specifies the type of beforeinput as Event instead of InputEvent
  // https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/jsx.ts
  const char = (event as InputEvent).data as string
  block.insert(text.length, {
    text: char,
    attributes: {},
  })
}

const textBoxContent = shallowRef('')
text.events.update.on(({ newAtoms }) => {
  textBoxContent.value = newAtoms.reduce((text, current) => text + current.text, '')
})
</script>

<template>
  <input
    class="absolute border border-dashed border-secondary-border"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
    :value="textBoxContent"
    @beforeinput.prevent="onBeforeInput"
  />
</template>
