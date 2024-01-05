<script setup lang="ts">
import { type TextBoxBlock } from './TextBoxBlock'
import RichText from '@RichText/RichText.vue'
import { ref } from 'vue'

const { block } = defineProps<{
  block: TextBoxBlock
}>()

const { x, y, textStore, bindController } = block

const width = ref(block.width)
const height = ref(block.height)
block.props.events.update.on(({ key, to }) => {
  if (key === 'width') {
    width.value = to as number
  } else if (key === 'height') {
    height.value = to as number
  }
})
</script>

<template>
  <div
    class="text-box absolute border border-dashed border-secondary-border"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
      padding: '30px',
    }"
  >
    <RichText :textStore="textStore" :bindController="bindController" />
  </div>
</template>
