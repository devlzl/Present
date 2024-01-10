<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import { selectionBlk, slideManager } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'
import { type BlkSlctnType } from '@Kernel/BlockSelection'
import { toolBox } from '@Kernel/index'
import { triggerRef } from 'vue'

const slideRef = ref<HTMLElement | null>(null)
onMounted(() => {
  toolBox.mount(slideRef.value as HTMLElement)
})

const slide = shallowRef(slideManager.currentSlide)
const blocks = shallowRef(slide.value.blocks)
const updateBlocks = () => {
  blocks.value = slide.value.blocks
  triggerRef(blocks)
}
slideManager.events.update.on(() => {
  slide.value = slideManager.currentSlide
  slide.value.events.blockChange.on(updateBlocks)
})
slide.value.events.blockChange.on(() => {
  updateBlocks()
})

const handleBlockClick = (evt: PointerEvent, block: BlkSlctnType) => {
  // if (evt.metaKey) {
  //   return selectionBlk.toggle(block)
  // }
  // selectionBlk.focus(block)
}

const selected = ref(new Map())
selectionBlk.events.update.on((evtType) => {
  // if (evtType !== 'update') {
  //   return
  // }
  // selected.value = new Map(selectionBlk.blocks.map((blk) => [blk.id, blk]))
})
</script>

<template>
  <div ref="slideRef" id="slide-wrapper" class="relative w-[960px] h-[540px] bg-white shadow-lg">
    <component
      v-for="block of blocks"
      :key="block.id"
      :is="BlockViews[block.type]"
      :block="block"
      :class="{
        'border !border-solid border-secondary-border bg-gray-50': selected.has(block.id),
      }"
      @click.stop="handleBlockClick($event, block)"
    ></component>
  </div>
</template>
