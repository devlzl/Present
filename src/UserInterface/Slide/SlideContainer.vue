<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { slideManager, selectionManager, toolBox } from '@Kernel/index'
import Slide from './Slide.vue'

const slide = shallowRef(slideManager.currentSlide)
slideManager.events.update.on(() => {
  slide.value = slideManager.currentSlide
  selectionManager.clear()
})

const slideContainerRef = ref<HTMLElement | null>(null)
const slideLocatorRef = ref<HTMLElement | null>(null)

const showDragArea = ref(false)
const dragAreaRect = ref({ x: 0, y: 0, width: 0, height: 0 })
const startCoords = { x: 0, y: 0 }

const handleMouseDown = (event: MouseEvent) => {
  if (toolBox.currentToolType !== 'Default') {
    return
  }
  showDragArea.value = true
  const { clientX, clientY } = event
  startCoords.x = clientX
  startCoords.y = clientY
  slideContainerRef.value?.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  const { clientX, clientY } = event
  const left = Math.min(startCoords.x, clientX)
  const top = Math.min(startCoords.y, clientY)
  const right = Math.max(startCoords.x, clientX)
  const bottom = Math.max(startCoords.y, clientY)
  const width = right - left
  const height = bottom - top
  dragAreaRect.value = {
    x: left,
    y: top,
    width: width,
    height: height,
  }
}

const handleMouseUp = () => {
  const blocks = slideManager.currentSlide.blocks
  const { x: dragAreaX, y: dragAreaY, width: dragAreaWidth, height: dragAreaHeight } = dragAreaRect.value
  const { x: slideRectX, y: slideRectY } = slideLocatorRef.value?.getBoundingClientRect() as DOMRect
  selectionManager.clear()
  blocks.forEach((block) => {
    const { x, y, width, height } = block
    const blockLeft = x + slideRectX
    const blockTop = y + slideRectY
    const blockRight = blockLeft + width
    const blockBottom = blockTop + height
    if (
      dragAreaX <= blockLeft &&
      dragAreaX + dragAreaWidth >= blockRight &&
      dragAreaY <= blockTop &&
      dragAreaY + dragAreaHeight >= blockBottom
    ) {
      selectionManager.add(block)
    }
  })
  showDragArea.value = false
  dragAreaRect.value = { x: 0, y: 0, width: 0, height: 0 }
  slideContainerRef.value?.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}
</script>

<template>
  <div
    ref="slideContainerRef"
    class="slide-container relative flex items-center justify-center flex-auto bg-secondary"
    @mousedown.self="handleMouseDown"
  >
    <div ref="slideLocatorRef" class="relative">
      <Slide :slide="slide" :inSlideContainer="true" @mousedown.self="handleMouseDown" />
    </div>

    <div
      v-if="showDragArea"
      class="fixed border border-secondary-border bg-gray-300/50"
      :style="{
        left: `${dragAreaRect.x}px`,
        top: `${dragAreaRect.y}px`,
        width: `${dragAreaRect.width}px`,
        height: `${dragAreaRect.height}px`,
      }"
    ></div>
  </div>
</template>
