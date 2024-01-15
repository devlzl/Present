<script setup lang="ts">
import { ref } from 'vue'
import { ShapeBlock } from './ShapeBlock'
import { BasicPropName } from '@BlockHub/Block/Block'
import { Square, Triangle, Round, Star, HexagonOne } from '@icon-park/vue-next'

const { block } = defineProps<{
  block: ShapeBlock
}>()

const { x, y, width, height, rotate, shape } = block
const props = ref({ x, y, width, height, rotate })
block.props.events.update.on(({ key, to }) => {
  if (['x', 'y', 'width', 'height', 'rotate'].includes(key)) {
    const name = key as BasicPropName
    props.value[name] = to as number
  }
})

const ShapeComponent = {
  rect: Square,
  triangle: Triangle,
  circle: Round,
  star: Star,
  hexagon: HexagonOne,
}[shape]
</script>

<template>
  <component
    class="absolute"
    :is="ShapeComponent"
    :size="props.width"
    theme="filled"
    fill="#4f71be"
    :style="{
      left: `${props.x}px`,
      top: `${props.y}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
      rotate: `${props.rotate}deg`,
    }"
  ></component>
</template>
