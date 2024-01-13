<script setup lang="ts">
import { BasicPropName } from '@BlockHub/Block/Block'
import { ref } from 'vue'
import { CanvasBlock } from './CanvasBlock'
import { OriginMap } from '@Kernel/Store/_Store'
import { onMounted } from 'vue'

const { block } = defineProps<{
  block: CanvasBlock
}>()

const { x, y, width, height, rotate } = block
const props = ref({ x, y, width, height, rotate })
block.props.events.update.on(({ key, to }) => {
  if (['x', 'y', 'width', 'height', 'rotate'].includes(key)) {
    const name = key as BasicPropName
    props.value[name] = to as number
  }
  render()
})
onMounted(() => {
  render()
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const render = () => {
  const context = (canvasRef.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  const { x, y, width, height } = props.value
  context.clearRect(x, y, width, height)

  const points = block.points
  if (points.length === 0) {
    return
  }
  context.save()
  context.strokeStyle = 'black'
  context.lineWidth = 1
  context.beginPath()
  const start = points.get(0) as OriginMap
  context.moveTo(start.x as number, start.y as number)
  for (const point of points.slice(1)) {
    const p = point as OriginMap
    context.lineTo(p.x as number, p.y as number)
  }
  context.stroke()
  context.restore()
}
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute"
    :width="props.width"
    :height="props.height"
    :style="{
      left: `${props.x}px`,
      top: `${props.y}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
      rotate: `${props.rotate}deg`,
    }"
  >
  </canvas>
</template>
