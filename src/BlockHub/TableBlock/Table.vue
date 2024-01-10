<script setup lang="ts">
import { type TableBlock } from './TableBlock'
import RichText from '@RichText/RichText.vue'
import { type ArrayStore } from '@Kernel/Store/ArrayStore'
import type { TextStore } from '@Kernel/Store/TextStore'
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import { CELL_WIDTH, CELL_HEIGHT } from './const'

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

const tableRef = ref<HTMLElement | null>(null)
const resizeObserver = new ResizeObserver((entries) => {
  const height = entries[0].borderBoxSize[0].blockSize
  block.height = height
})
onMounted(() => {
  resizeObserver.observe(tableRef.value as HTMLElement)
})
onUnmounted(() => {
  resizeObserver.unobserve(tableRef.value as HTMLElement)
})
</script>

<template>
  <div
    ref="tableRef"
    class="table absolute border border-dashed border-secondary-border"
    :style="{
      left: `${block.x}px`,
      top: `${block.y}px`,
      padding: '30px',
    }"
  >
    <div
      class="row flex"
      v-for="(row, rowIndex) of tableData"
      :style="{ width: `${CELL_WIDTH * row.length}`, minHeight: `${CELL_HEIGHT}px` }"
    >
      <div
        class="cell inline-block border align-top"
        :style="{ width: `${CELL_WIDTH}px` }"
        v-for="(cell, columnIndex) of row"
      >
        <RichText
          @click="block.updateCurrentCoord(rowIndex, columnIndex)"
          :textStore="(cell as TextStore)"
          :bindController="(controller) => block.bindController(rowIndex, columnIndex, controller)"
        />
      </div>
    </div>
  </div>
</template>
