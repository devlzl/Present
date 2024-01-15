<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { TableFile, Down } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { slideManager } from '@Kernel/index'
import { TableBlock } from '@BlockHub/TableBlock/TableBlock'
import ToolButton from '../ToolButton.vue'

const showCreateTableBox = ref<boolean>(false)
const curTableId = ref<number>(-1)
const curRowIndex = ref<number>(0)
const curColIndex = ref<number>(0)

const insertTable = (rowIndex: number, colIndex: number) => {
  const block = new TableBlock(300, 200, rowIndex, colIndex)
  slideManager.currentSlide.addBlock(block)
  showCreateTableBox.value = false
  curRowIndex.value = 0
  curColIndex.value = 0
  curTableId.value = -1
}
const mouseoverHanlder = (rowIndex: number, colIndex: number) => {
  curRowIndex.value = rowIndex
  curColIndex.value = colIndex
  /* if (curTableId.value === -1) {
    const block = new TableBlock(300, 200, rowIndex, colIndex)
    slideManager.currentSlide.addBlock(block)
    curTableId.value = block.id
  } else {
    console.log(slideManager.currentSlide.blocks[curTableId.value]);
    slideManager.currentSlide.blocks[curTableId.value].updateCurrentSize(rowIndex, colIndex);
  } */
}
const mouseLeaveHandler = () => {
  curRowIndex.value = 0
  curColIndex.value = 0
}
const handleDocumentClick = () => {
  showCreateTableBox.value = false
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.table.title')">
    <button
      class="relative flex flex-col items-center py-0 menu-btn"
      @click.stop="showCreateTableBox = !showCreateTableBox"
    >
      <TableFile class="mb-1" theme="outline" size="32" fill="#333" :strokeWidth="2" />
      <span class="text-xs">{{ $t('ToolBar.insert.table.title') }}</span>
      <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
      <div
        v-if="showCreateTableBox"
        class="absolute w-[210px] h-[200px] border border-gray-500 top-[70px] left-0 bg-white"
      >
        <div class="w-full h-[20px] mb-[5px] bg-gray-100 text-left pl-2 font-bold text-gray-500">插入表格</div>
        <div class="ml-[3px]" @mouseleave="mouseLeaveHandler">
          <div v-for="rowIndex of 8" :key="rowIndex" class="flex justify-center">
            <div
              v-for="colIndex of 10"
              :key="colIndex + (rowIndex - 1) * 10"
              class="w-[17px] h-[17px] border mr-[3px] mb-1"
              :class="rowIndex <= curRowIndex && colIndex <= curColIndex ? 'border-orange-300' : ''"
              @mouseover="mouseoverHanlder(rowIndex, colIndex)"
              @click.stop="insertTable(rowIndex, colIndex)"
            ></div>
          </div>
        </div>
      </div>
    </button>
  </ButtonGroup>
</template>
