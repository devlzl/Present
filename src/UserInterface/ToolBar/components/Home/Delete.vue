<script setup lang="ts">
import { Close } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { selectionManager, slideManager } from '@Kernel/index'
import { shallowRef } from 'vue'
import ToolButton from '../ToolButton.vue'

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
  <ButtonGroup :name="$t('ToolBar.home.delete')">
    <ToolButton :clickHandler="removeBlock" :disabled="selectedBlocks.length === 0">
      <template #icon>
        <Close theme="outline" size="32" fill="#ED3D3B" :strokeWidth="2" />
      </template>
      <template #name>{{ $t('ToolBar.home.delete') }}</template>
    </ToolButton>
  </ButtonGroup>
</template>
