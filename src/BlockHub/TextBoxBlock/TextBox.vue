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
  const { target, inputType, data } = event as InputEvent
  if (inputType === 'insertText') {
    block.insert(text.length, {
      text: data as string,
      attributes: {},
    })
  } else if (inputType === 'deleteContentBackward') {
    const index = (target as HTMLInputElement).selectionStart as number
    block.delete(index - 1, 1)
  }
}

const textBoxContent = shallowRef('')
text.events.update.on(({ newAtoms }) => {
  textBoxContent.value = newAtoms.reduce((text, current) => text + current.text, '')
})
</script>

<template>
  <input
    class="text-box"
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

<style scoped lang="scss">
.text-box {
  position: absolute;
  border: 1px dashed gray;
}
</style>
