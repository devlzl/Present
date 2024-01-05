<script setup lang="ts">
import { ref, watch } from 'vue';
import { kernel, selectionBlk } from '@Kernel/index'
import type { Slide } from '@Kernel/Slide';
import { BlockViews } from '@BlockHub/BlockHub'
import { type BlkSlctnType } from '@Kernel/BlockSelection'

const slide = ref<Slide>(kernel.currentSlide);

watch(
  () => kernel.currentIndex,
  () => {
    slide.value = kernel.currentSlide;
  }
);

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
  <div
    id="slide-wrapper"
    class="relative w-[960px] h-[540px] bg-white shadow-lg"
  >
    <component
      v-for="block of slide.blocks"
      :is="BlockViews[block.type]"
      :block="block"
      :class="{
        'border !border-solid border-secondary-border bg-gray-50': selected.has(
          block.id
        ),
      }"
      @click.stop="handleBlockClick($event, block)"
    ></component>
  </div>
</template>
