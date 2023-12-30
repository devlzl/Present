<script setup lang="ts">
import { type TableBlock } from './TableBlock'
import RichText from '@RichText/RichText.vue'
import { type ArrayStore } from '@Kernel/Store/ArrayStore'
import type { AttributeValue, TextStore } from '@Kernel/Store/TextStore'
import { ref, shallowRef } from 'vue'

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

const currentCell = ref({ row: 0, column: 0 })
function format(name: string, value: AttributeValue) {
  const { row, column } = currentCell.value
  const controller = block.getController(row, column)
  controller.format(name, value)
}
</script>

<template>
  <div
    class="table absolute"
    :style="{
      left: `${block.x}px`,
      top: `${block.y}px`,
    }"
  >
    <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="format('bold', true)">
      bold
    </button>
    <input type="color" @input="(event) => format('color', (event.target as HTMLInputElement).value)" />
    <div class="row" v-for="(row, rowIndex) of tableData">
      <div class="cell inline-block border w-[100px]" v-for="(cell, columnIndex) of row">
        <RichText
          @click="currentCell = { row: rowIndex, column: columnIndex }"
          :textStore="(cell as TextStore)"
          :bindController="(controller) => block.bindController(rowIndex, columnIndex, controller)"
        />
      </div>
    </div>
  </div>
</template>
