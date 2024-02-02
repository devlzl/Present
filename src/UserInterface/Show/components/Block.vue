<script setup lang="ts">
import { BasicPropName, type Block } from '@BlockHub/Block/Block'
import { BlockViews } from '@BlockHub/BlockHub'
import { ref } from 'vue'

const { block } = defineProps<{
  block: Block
}>()

const { x, y, width, height, rotate } = block
const props = ref({ x, y, width, height, rotate })
block.props.events.update.on(({ key, to }) => {
  if (['x', 'y', 'width', 'height', 'rotate'].includes(key)) {
    const name = key as BasicPropName
    props.value[name] = to as number
  }
})
</script>

<template>
  <component
    :key="block.id"
    :is="BlockViews[block.type]"
    :block="block"
    :style="{
      position: 'absolute',
      left: `${props.x}px`,
      top: `${props.y}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
      rotate: `${props.rotate}deg`,
    }"
  ></component>
</template>
