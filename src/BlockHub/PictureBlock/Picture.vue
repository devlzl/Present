<script setup lang="ts">
import { BasicPropName } from '@BlockHub/Block/Block'
import { type PictureBlock } from './PictureBlock'
import { ref } from 'vue'

const { block } = defineProps<{
  block: PictureBlock
}>()

const { x, y, width, height, rotate, url } = block

const props = ref({ x, y, width, height, rotate, url })
block.props.events.update.on(({ key, to }) => {
  if (['x', 'y', 'width', 'height', 'rotate'].includes(key)) {
    const name = key as BasicPropName
    props.value[name] = to as number
  } else if (key === 'url') {
    props.value.url = to as string
  }
})
</script>

<template>
  <div
    class="picture absolute"
    :style="{
      left: `${props.x}px`,
      top: `${props.y}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
      rotate: `${props.rotate}deg`,
    }"
  >
    <img :src="props.url" :style="{ width: '100%', height: '100%' }" />
  </div>
</template>
