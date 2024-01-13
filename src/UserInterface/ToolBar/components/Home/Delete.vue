<script setup lang="ts">
import { Close } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
import { selectionManager, slideManager } from '@Kernel/index'
import { shallowRef } from 'vue'

const selectedBlocks = shallowRef(selectionManager.selectedBlocks)
selectionManager.events.update.on(() => {
  selectedBlocks.value = selectionManager.selectedBlocks
})
const removeBlock = () => {
  const slide = slideManager.currentSlide
  selectedBlocks.value.forEach((block) => {
    slide.removeBlock(block)
    selectionManager.remove(block)
  })
}
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.home.delete')">
    <button class="menu-btn flex flex-col items-center" @click="removeBlock">
      <close theme="outline" size="32" fill="#ED3D3B" :strokeWidth="2" />
      <span class="text-xs mt-1">{{ $t('ToolBar.home.delete') }}</span>
    </button>
  </MenuWrapper>
</template>
