<script setup lang="ts">
import { ref, onMounted, shallowRef, watch } from 'vue'
import { BlockViews } from '@BlockHub/BlockHub'
import { toolBox, selectionManager } from '@Kernel/index'
import { DEFAULT_SLIDE_WIDTH, DEFAULT_SLIDE_HEIGHT } from '@Const/slide'
import { Block } from '@BlockHub/Block/Block'
import SelectedBox from './components/SelectedBox.vue'
import { Slide } from '@Kernel/Slide'

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
    class="relative bg-white shadow-lg"
    :style="{
      width: `${DEFAULT_SLIDE_WIDTH}px`,
      height: `${DEFAULT_SLIDE_HEIGHT}px`,
      cursor: toolType === 'TextBox' || toolType === 'Shape' ? 'crosshair' : 'default',
    }"
  >
    <SelectedBox v-if="props.inSlideContainer" />
    <component
      v-for="block of blocks"
      :key="block.id"
      :is="BlockViews[block.type]"
      :block="block"
      @click="handleBlockClick($event, block)"
    ></component>
  </div>
</template>
