<script setup lang="ts">
import { BasicPropName } from '@BlockHub/Block/Block'
import { type TextBoxBlock } from './TextBoxBlock'
import RichText from '@RichText/RichText.vue'
import { ref } from 'vue'

const { block } = defineProps<{
  block: TextBoxBlock
}>()

const { x, y, width, height, rotate, align, textStore, bindController } = block

const props = ref({ x, y, width, height, rotate, align })
block.props.events.update.on(({ key, to }) => {
  const value = to as number
  const rectKey = key as BasicPropName
  if (['x', 'y', 'width', 'height', 'rotate', 'align'].includes(rectKey)) {
    props.value[rectKey] = value
  }
})
</script>

<template>
  <div
    class="text-box absolute border border-dashed border-secondary-border"
    :style="{
      left: `${props.x}px`,
      top: `${props.y}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
      rotate: `${props.rotate}deg`,
      padding: '4px',
      textAlign: `${props.align}`,
    }"
  >
    <RichText :textStore="textStore" :bindController="bindController" />
  </div>
</template>
