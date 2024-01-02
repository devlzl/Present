<script setup lang="ts">
import { kernel, selectionBlk } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'
import { type BlkSlctnType } from '@Kernel/BlockSelection'

const slide = kernel.currentSlide

const handleBlockClick = (evt: PointerEvent, block: BlkSlctnType) => {
  if (evt.metaKey) {
    return selectionBlk.toggle(block)
  }
  selectionBlk.focus(block)
}
</script>

<template>
  <div class="relative w-[960px] h-[540px] bg-white shadow-lg">
    <component
      v-for="block of slide.blocks"
      :is="BlockViews[block.type]"
      :block="block"
      @click.stop="handleBlockClick($event, block)"
    ></component>
  </div>
</template>
