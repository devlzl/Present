<script setup lang="ts">
import { TableFile, Down } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { slideManager } from '@Kernel/index'
import { TableBlock } from '@BlockHub/TableBlock/TableBlock'

const insertTable = () => {
  const block = new TableBlock(300, 200, 4, 3)
  slideManager.currentSlide.addBlock(block)
}
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.table.title')">
    <button class="flex flex-col items-center py-0 menu-btn" @click="insertTable">
      <TableFile class="mb-1" theme="outline" size="32" fill="#333" :strokeWidth="2" />
      <span class="text-xs">{{ $t('ToolBar.insert.table.title') }}</span>
      <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
    </button>
  </ButtonGroup>
</template>
