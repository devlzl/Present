<script setup lang="ts">
import { ref } from 'vue'
import { selectionBlk, slideManager } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'
import { type BlkSlctnType } from '@Kernel/BlockSelection'
import { shallowRef } from 'vue'

const slide = shallowRef(slideManager.currentSlide)
slideManager.events.update.on(() => {
  slide.value = slideManager.currentSlide
})

const handleBlockClick = (evt: PointerEvent, block: BlkSlctnType) => {
  if (evt.metaKey) {
    return selectionBlk.toggle(block)
  }
  selectionBlk.focus(block)
}

const selected = ref(new Map())
selectionBlk.events.update.on((evtType) => {
  if (evtType !== 'update') {
    return
  }
  selected.value = new Map(selectionBlk.blocks.map((blk) => [blk.id, blk]))
})
</script>

<template>
  <div id="slide-wrapper" class="relative w-[960px] h-[540px] bg-white shadow-lg">
    <component
      v-for="block of slide.blocks"
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
