<script setup lang="ts">
import { ref } from 'vue'
import { TableFile } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { slideManager } from '@Kernel/index'
import { TableBlock } from '@BlockHub/TableBlock/TableBlock'
import ToolButton from '../ToolButton.vue'

const curRowIndex = ref<number>(0)
const curColIndex = ref<number>(0)

const insertTable = (row: number, column: number) => {
  const block = new TableBlock(100, 100, row, column)
  slideManager.currentSlide.addBlock(block)
  curRowIndex.value = 0
  curColIndex.value = 0
}

const mouseOverHandler = (rowIndex: number, colIndex: number) => {
  curRowIndex.value = rowIndex
  curColIndex.value = colIndex
}

const mouseLeaveHandler = () => {
  curRowIndex.value = 0
  curColIndex.value = 0
}
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.table.title')">
    <ToolButton :hasMenu="true">
      <template #icon>
        <TableFile class="mb-1" theme="outline" size="32" fill="#333" :strokeWidth="2" />
      </template>
      <template #name>{{ $t('ToolBar.insert.table.title') }}</template>
      <template #menu>
        <div class="px-[16px] pt-[6px] pb-[12px]">
          <div class="h-[28px]">
            {{ $t('ToolBar.insert.table.insert') }}
          </div>
          <div @mouseleave="mouseLeaveHandler" class="flex flex-wrap gap-[4px]">
            <div v-for="rowIndex of 8" :key="rowIndex" class="flex justify-center gap-[4px]">
              <div
                v-for="colIndex of 10"
                :key="`${rowIndex}-${colIndex}`"
                class="w-[17px] h-[17px] border"
                :class="rowIndex <= curRowIndex && colIndex <= curColIndex ? 'bg-blue-100 border-blue-400' : ''"
                @mouseover="mouseOverHandler(rowIndex, colIndex)"
                @click="insertTable(rowIndex, colIndex)"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </ToolButton>
  </ButtonGroup>
</template>
