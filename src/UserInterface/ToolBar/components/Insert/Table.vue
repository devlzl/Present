<script setup lang="ts">
import { TableFile } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { slideManager } from '@Kernel/index'
import { TableBlock } from '@BlockHub/TableBlock/TableBlock'
import ToolButton from '../ToolButton.vue'

const insertTable = () => {
  const block = new TableBlock(300, 200, 4, 3)
  slideManager.currentSlide.addBlock(block)
}
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.table.title')">
    <ToolButton :clickHandler="insertTable" :hasMenu="true">
      <template #icon>
        <TableFile class="mb-1" theme="outline" size="32" fill="#333" :strokeWidth="2" />
      </template>
      <template #name>{{ $t('ToolBar.insert.table.title') }}</template>
    </ToolButton>
  </ButtonGroup>
</template>
