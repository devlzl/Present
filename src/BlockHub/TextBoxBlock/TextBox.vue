<script setup lang="ts">
import { type TextBoxBlock } from './TextBoxBlock'
import RichText from '@RichText/RichText.vue'
import { ref } from 'vue'

type RectKey = 'x' | 'y' | 'width' | 'height'

const { block } = defineProps<{
  block: TextBoxBlock
}>()

const { x, y, width, height, textStore, bindController } = block

const rect = ref({ x, y, width, height })
block.props.events.update.on(({ key, to }) => {
  const value = to as number
  const rectKey = key as RectKey
  if (['x', 'y', 'width', 'height'].includes(rectKey)) {
    rect.value[rectKey] = value
  }
})
</script>

<template>
  <div
    class="text-box absolute border border-dashed border-secondary-border"
    :style="{
      left: `${rect.x}px`,
      top: `${rect.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      padding: '4px',
    }"
  >
    <RichText :textStore="textStore" :bindController="bindController" />
  </div>
</template>
