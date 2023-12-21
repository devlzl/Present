<script setup lang="ts">
import { TextBoxModel } from '@Kernel/ElementModels/TextBoxModel'
import { shallowRef } from 'vue'

const { model } = defineProps<{
  model: TextBoxModel
}>()

const { x, y, width, height, text } = model

const onBeforeInput = (event: Event) => {
  // Vue specifies the type of beforeinput as Event instead of InputEvent
  // https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/jsx.ts
  const char = (event as InputEvent).data as string
  model.insert(text.length, {
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
