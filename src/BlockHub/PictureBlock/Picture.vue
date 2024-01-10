<script setup lang="ts">
import { type PictureBlock } from './PictureBlock'
import { ref } from 'vue'

const { block } = defineProps<{
  block: PictureBlock
}>()

const { x, y, width, height } = block

const url = ref(block.url)
const rotate = ref(block.rotate)
block.props.events.update.on(({ key, to }) => {
  if (key === 'url') {
    url.value = to as string
  } else if (key === 'rotate') {
    rotate.value = to as number
  }
})
</script>

<template>
  <div
    class="picture absolute"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <input
      type="range"
      value="0"
      min="0"
      max="360"
      @input="(event) => (block.rotate = Number((event.target as HTMLInputElement).value))"
    />

    <img :src="url" :style="{ transform: `rotate(${rotate}deg)` }" />
  </div>
</template>
