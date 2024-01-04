<script setup lang="ts">
import { type TableBlock } from './TableBlock'
import RichText from '@RichText/RichText.vue'
import { type ArrayStore } from '@Kernel/Store/ArrayStore'
import type { TextStore } from '@Kernel/Store/TextStore'
import { shallowRef } from 'vue'

const { block } = defineProps<{
  block: TableBlock
}>()

const tableData = shallowRef([] as Array<Array<TextStore>>)
for (const row of block.data) {
  const rowData = []
  for (const cell of row as ArrayStore) {
    rowData.push(cell)
  }
  tableData.value.push(rowData as Array<TextStore>)
}
</script>

<template>
  <div
    class="table absolute border border-dashed border-secondary-border"
    :style="{
      left: `${block.x}px`,
      top: `${block.y}px`,
      padding: '30px',
    }"
  >
    <div class="row" v-for="(row, rowIndex) of tableData">
      <div class="cell inline-block border w-[100px]" v-for="(cell, columnIndex) of row">
        <RichText
          @click="block.updateCurrentCoord(rowIndex, columnIndex)"
          :textStore="(cell as TextStore)"
          :bindController="(controller) => block.bindController(rowIndex, columnIndex, controller)"
        />
      </div>
    </div>
  </div>
</template>
