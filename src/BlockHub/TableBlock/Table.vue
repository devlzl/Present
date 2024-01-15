<script setup lang="ts">
import { type TableBlock } from './TableBlock'
import RichText from '@RichText/RichText.vue'
import { type ArrayStore } from '@Kernel/Store/ArrayStore'
import type { TextStore } from '@Kernel/Store/TextStore'
import { ref, shallowRef, computed } from 'vue'
import { BasicPropName } from '@BlockHub/Block/Block'

const { block } = defineProps<{
  block: TableBlock
}>()

const { row, column, data, x, y, width, height, rotate, bindController } = block

const tableData = shallowRef([] as Array<Array<TextStore>>)
for (const row of data) {
  const rowData = []
  for (const cell of row as ArrayStore) {
    rowData.push(cell)
  }
  tableData.value.push(rowData as Array<TextStore>)
}

const props = ref({ x, y, width, height, rotate })
console.log('props', width, height)
block.props.events.update.on(({ key, to }) => {
  const value = to as number
  const rectKey = key as BasicPropName
  if (['x', 'y', 'width', 'height', 'rotate'].includes(rectKey)) {
    props.value[rectKey] = value
  }
})
const cellWidth = computed(() => {
  return props.value.width / column
})
const cellHeight = computed(() => {
  return props.value.height / row
})
</script>

<template>
  <div
    ref="tableRef"
    class="table absolute border border-dashed border-secondary-border"
    :style="{
      left: `${props.x}px`,
      top: `${props.y}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
      rotate: `${props.rotate}deg`,
    }"
  >
    <div
      class="row flex"
      v-for="(row, rowIndex) of tableData"
      :style="{
        width: `${cellWidth * row.length}`,
        height: `${cellHeight}px`,
        backgroundColor: rowIndex % 2 === 0 ? '#d0d5e8' : '#e9ebf4',
      }"
    >
      <div
        class="cell inline-block border align-top"
        :style="{ width: `${cellWidth}px` }"
        v-for="(cell, columnIndex) of row"
      >
        <RichText
          @click="block.updateCurrentCoord(rowIndex, columnIndex)"
          :textStore="(cell as TextStore)"
          :bindController="(controller) => bindController(rowIndex, columnIndex, controller)"
        />
      </div>
    </div>
  </div>
</template>
