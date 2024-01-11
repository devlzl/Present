<script setup lang="ts">
import { ref } from 'vue'
import { selectionManager } from '@Kernel/index'
import { SELECTED_BOX_MULTI_PADDING } from '@Const/select'
import { OneThirdRotation } from '@icon-park/vue-next'
import { shallowRef } from 'vue'

const showSelectedBox = ref(false)
const selectedBoxRect = ref({ x: 0, y: 0, width: 0, height: 0 })

const updateSelectedBoxRect = () => {
  const blocks = selectedBlocks.value
  showSelectedBox.value = blocks.length > 0
  if (blocks.length === 1) {
    const block = blocks[0]
    selectedBoxRect.value = {
      x: block.x,
      y: block.y,
      width: block.width,
      height: block.height,
    }
  } else {
    const padding = SELECTED_BOX_MULTI_PADDING
    const left = Math.min(...blocks.map((block) => block.x))
    const top = Math.min(...blocks.map((block) => block.y))
    const right = Math.max(...blocks.map((block) => block.x + block.width))
    const bottom = Math.max(...blocks.map((block) => block.y + block.height))
    selectedBoxRect.value = {
      x: left - padding,
      y: top - padding,
      width: right - left + padding * 2,
      height: bottom - top + padding * 2,
    }
  }
}

const selectedBlocks = shallowRef(selectionManager.selectedBlocks)
selectionManager.events.update.on(() => {
  selectedBlocks.value = selectionManager.selectedBlocks
  updateSelectedBoxRect()
  selectedBlocks.value.forEach((block) => {
    block.props.events.update.on(updateSelectedBoxRect)
  })
})
</script>

<template>
  <div
    class="selected-box absolute border border-secondary-border"
    v-if="showSelectedBox"
    :style="{
      left: `${selectedBoxRect.x}px`,
      top: `${selectedBoxRect.y}px`,
      width: `${selectedBoxRect.width}px`,
      height: `${selectedBoxRect.height}px`,
      rotate: `${selectedBlocks.length === 1 ? selectedBlocks[0].rotate : 0}deg`,
    }"
  >
    <OneThirdRotation
      v-if="selectedBlocks.length === 1"
      class="rotate-handle"
      :style="{ top: '-40px', left: `${selectedBoxRect.width / 2 - 12}px` }"
      theme="outline"
      size="24"
      fill="#333"
      :strokeWidth="2"
    />

    <div class="move-handle" :style="{ top: '-8px', width: '100%', height: '4px' }"></div>
    <div class="move-handle" :style="{ bottom: '-8px', width: '100%', height: '4px' }"></div>
    <div class="move-handle" :style="{ left: '-8px', width: '4px', height: '100%' }"></div>
    <div class="move-handle" :style="{ right: '-8px', width: '4px', height: '100%' }"></div>

    <div
      class="size-handle top cursor-ns-resize"
      :style="{ top: '-12px', left: `${selectedBoxRect.width / 2 - 6}px` }"
    ></div>
    <div
      class="size-handle bottom cursor-ns-resize"
      :style="{ bottom: '-12px', left: `${selectedBoxRect.width / 2 - 6}px` }"
    ></div>
    <div
      class="size-handle left cursor-ew-resize"
      :style="{ top: `${selectedBoxRect.height / 2 - 6}px`, left: '-12px' }"
    ></div>
    <div
      class="size-handle right cursor-ew-resize"
      :style="{ top: `${selectedBoxRect.height / 2 - 6}px`, right: '-12px' }"
    ></div>

    <div class="size-handle top left cursor-nwse-resize" :style="{ top: '-12px', left: '-12px' }"></div>
    <div class="size-handle top right cursor-nesw-resize" :style="{ top: '-12px', right: '-12px' }"></div>
    <div class="size-handle bottom left cursor-nesw-resize" :style="{ bottom: '-12px', left: '-12px' }"></div>
    <div class="size-handle bottom right cursor-nwse-resize" :style="{ bottom: '-12px', right: '-12px' }"></div>
  </div>
</template>

<style scoped lang="scss">
.rotate-handle {
  position: absolute;
  cursor: grab;
}

.move-handle {
  position: absolute;
  z-index: 1;
  background-color: lightgray;
  cursor: move;
}

.size-handle {
  position: absolute;
  z-index: 1;
  width: 12px;
  height: 12px;
  background-color: white;
  border: 2px solid gray;
  border-radius: 50%;
}
</style>
