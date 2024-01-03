<script setup lang="ts">
import { ref } from 'vue'
import { kernel, selectionBlk } from '@Kernel/index'
import Slide from './Slide.vue'

const blocks = kernel.currentSlide.blocks

// drag selection
const showDrag = ref(false)
const initPos = { x: 0, y: 0 }
const initSize = { width: 0, height: 0 }
const dragPos = ref<{ x: number; y: number }>(initPos)
const dragSize = ref<{ width: number; height: number }>(initSize)

const handleMouseDown = (evt: MouseEvent) => {
  showDrag.value = true
  dragPos.value = { x: evt.clientX, y: evt.clientY }

  const slideContainer = document.getElementById(
    'slide-container'
  ) as HTMLElement
  slideContainer.addEventListener('mousemove', handleMouseMove)
  slideContainer.addEventListener('mouseup', handleMouseUp)
  slideContainer.addEventListener('mouseleave', handleMouseLeave)
}

const handleMouseUp = (evt: MouseEvent) => {
  // 处理选区逻辑，判断是否包含
  const { clientX, clientY } = evt
  const { x, y } = dragPos.value
  const left = Math.min(x, clientX)
  const top = Math.min(y, clientY)
  const right = Math.max(x, clientX)
  const bottom = Math.max(y, clientY)
  console.log(
    '------- left: ',
    left,
    ' top: ',
    top,
    ' right: ',
    right,
    ' bottom: ',
    bottom
  )

  selectionBlk.clear()
  blocks.forEach((block) => {
    const { x: blockLeft, y: blockTop, width, height } = block
    const blockRight = x + width
    const blockBottom = y + height
    console.log(
      '++++++ blockID blockLeft: ',
      blockLeft,
      ' blockTop: ',
      blockTop,
      ' blockRight: ',
      blockRight,
      ' blockBottom: ',
      blockBottom
    )
    if (
      left <= blockLeft &&
      right >= blockRight &&
      top <= blockTop &&
      bottom >= blockBottom
    ) {
      selectionBlk.add(block)
    }
  })
  // const rect = { left, top, right, bottom, width, height }
  // selectionBlk.setSelection(rect)
  // 移除事件监听
  handleMouseLeave()
}

const rotateX = ref(0)
const rotateY = ref(0)
const handleMouseMove = (evt: MouseEvent) => {
  const { clientX, clientY } = evt
  dragSize.value = {
    width: Math.abs(clientX - dragPos.value.x),
    height: Math.abs(clientY - dragPos.value.y),
  }
  // 判断拖动方向
  rotateY.value = clientX < dragPos.value.x ? 180 : 0
  rotateX.value = clientY < dragPos.value.y ? 180 : 0
}

const handleMouseLeave = () => {
  showDrag.value = false
  dragPos.value = initPos
  dragSize.value = initSize
  removeEvents()
}

const removeEvents = () => {
  const slideContainer = document.getElementById(
    'slide-container'
  ) as HTMLElement
  slideContainer.removeEventListener('mousemove', handleMouseMove)
  slideContainer.removeEventListener('mouseup', handleMouseUp)
  slideContainer.removeEventListener('mouseleave', handleMouseLeave)
}
</script>

<template>
  <div
    id="slide-container"
    class="relative flex-auto flex items-center justify-center bg-secondary"
    @mousedown.self="handleMouseDown"
  >
    <Slide @mousedown.self="handleMouseDown" />
    <div
      v-if="showDrag"
      class="fixed border border-secondary-border bg-gray-300/50"
      :style="{
        left: `${dragPos.x}px`,
        top: `${dragPos.y}px`,
        width: `${dragSize.width}px`,
        height: `${dragSize.height}px`,
        transformOrigin: 'top left',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }"
    ></div>
  </div>
</template>
