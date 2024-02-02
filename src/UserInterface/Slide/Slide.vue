<script setup lang="ts">
import { ref, onMounted, shallowRef, watch } from 'vue'
import { toolBox, selectionManager } from '@Kernel/index'
import { DEFAULT_SLIDE_WIDTH, DEFAULT_SLIDE_HEIGHT } from '@Const/slide'
import type { Block } from '@BlockHub/Block/Block'
import type { Slide } from '@Kernel/Slide'
import SelectableBlock from './components/SelectableBlock.vue'

const props = defineProps<{
  slide: Slide
  inSlideContainer?: boolean
}>()

const slide = shallowRef(props.slide)
const blocks = shallowRef(slide.value.blocks)
const updateBlocks = () => {
  blocks.value = slide.value.blocks
}
watch(props, () => {
  slide.value = props.slide
})
watch(slide, () => {
  updateBlocks()
  slide.value.events.blockChange.on(updateBlocks)
})
slide.value.events.blockChange.on(updateBlocks)

const slideRef = ref<HTMLElement | null>(null)
onMounted(() => {
  if (props.inSlideContainer) {
    toolBox.mount(slideRef.value as HTMLElement)
  }
})

const handleBlockClick = (event: PointerEvent, block: Block) => {
  if (event.metaKey) {
    return selectionManager.toggle(block)
  }
  selectionManager.focus(block)
}

const toolType = ref(toolBox.currentToolType)
toolBox.events.toolChange.on(() => {
  toolType.value = toolBox.currentToolType
})
</script>

<template>
  <div
    ref="slideRef"
    class="relative bg-white shadow-lg overflow-hidden"
    :style="{
      width: `${DEFAULT_SLIDE_WIDTH}px`,
      height: `${DEFAULT_SLIDE_HEIGHT}px`,
      cursor: toolType === 'TextBox' || toolType === 'Shape' ? 'crosshair' : 'default',
    }"
  >
    <SelectableBlock
      v-for="block of blocks"
      :key="block.id"
      :block="block"
      :inSlideContainer="props.inSlideContainer"
      @click="handleBlockClick($event, block)"
    />
  </div>
</template>
