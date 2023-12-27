<script setup lang="ts">
import { type TextBoxBlock } from './TextBoxBlock'
import RichText from '@RichText/RichText.vue'

const { block } = defineProps<{
  block: TextBoxBlock
}>()

const { x, y, width, height, text } = block
</script>

<template>
  <div
    class="absolute border border-dashed border-secondary-border"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <RichText :textStore="text" />
  </div>
</template>
