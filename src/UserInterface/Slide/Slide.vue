<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import { slideManager } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'
import { toolBox, selectionManager } from '@Kernel/index'
import { DEFAULT_SLIDE_WIDTH, DEFAULT_SLIDE_HEIGHT } from '@Const/slide'
import { Block } from '@BlockHub/Block/Block'
import SelectedBox from './components/SelectedBox.vue'

const slideRef = ref<HTMLElement | null>(null)
defineExpose({ slideRef })
onMounted(() => {
  toolBox.mount(slideRef.value as HTMLElement)
})

const slide = shallowRef(slideManager.currentSlide)
const blocks = shallowRef(slide.value.blocks)
const updateBlocks = () => {
  blocks.value = slide.value.blocks
}
slideManager.events.update.on(() => {
  slide.value = slideManager.currentSlide
  slide.value.events.blockChange.on(updateBlocks)
  selectionManager.clear()
  updateBlocks()
})
slide.value.events.blockChange.on(() => {
  updateBlocks()
})

const handleBlockClick = (event: PointerEvent, block: Block) => {
  if (event.metaKey) {
    return selectionManager.toggle(block)
  }
  selectionManager.focus(block)
}

const selectedBlocks = shallowRef(selectionManager.selectedBlocks)
selectionManager.events.update.on(() => {
  selectedBlocks.value = selectionManager.selectedBlocks
})

const toolType = ref(toolBox.currentToolType)
toolBox.events.toolChange.on(() => {
  toolType.value = toolBox.currentToolType
})
</script>

<template>
  <div
    ref="slideRef"
    class="relative bg-white shadow-lg"
    :style="{
      width: `${DEFAULT_SLIDE_WIDTH}px`,
      height: `${DEFAULT_SLIDE_HEIGHT}px`,
      cursor: toolType === 'TextBox' || toolType === 'Shape' ? 'crosshair' : 'default',
    }"
  >
    <SelectedBox />
    <component
      v-for="block of blocks"
      :key="block.id"
      :is="BlockViews[block.type]"
      :block="block"
      @click="handleBlockClick($event, block)"
    ></component>
  </div>
</template>
