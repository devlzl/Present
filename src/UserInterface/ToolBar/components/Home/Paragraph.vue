<script setup lang="ts">
import {
  // ListCheckbox,
  // OrderedList,
  // AlignTextLeftOne,
  // AlignTextRightOne,
  // RowHeight,
  // AlignTextBoth,
  AlignTextLeft,
  AlignTextRight,
  AlignTextCenter,
} from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { AlignType, TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { selectionManager } from '@Kernel/index'
import { ref, shallowRef } from 'vue'
import { computed } from 'vue'

const selectedBlocks = shallowRef(selectionManager.selectedBlocks)
selectionManager.events.update.on(() => {
  selectedBlocks.value = selectionManager.selectedBlocks
  updateAlignState(textBoxBlocks.value)
})

const textBoxBlocks = computed(() => {
  const blocks = selectedBlocks.value.filter((block) => block.type === 'TextBox') as TextBoxBlock[]
  blocks.forEach((block) => {
    block.props.events.update.on(() => updateAlignState(blocks))
  })
  return blocks
})

const alignState = ref()
const updateAlignState = (blocks: TextBoxBlock[]) => {
  if (blocks.length === 0) {
    alignState.value = undefined
    return
  }
  const align = blocks[0].align
  for (let i = 1; i < blocks.length; i++) {
    if (align !== blocks[i].align) {
      alignState.value = undefined
      return
    }
  }
  alignState.value = align
}

const updateAlign = (value: AlignType) => {
  textBoxBlocks.value.forEach((block) => {
    block.align = value
  })
}
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.home.paragraph.title')">
    <div class="max-w-[170px] flex flex-wrap items-center text-xs pt-1">
      <!-- <button class="menu-btn">
        <list-checkbox theme="two-tone" size="24" :fill="['#333', '#43CCF8']" :strokeWidth="2" />
      </button>
      <button class="menu-btn w-7 h-7">
        <ordered-list theme="two-tone" size="24" :fill="['#333', '#43CCF8']" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <align-text-left-one theme="multi-color" size="24" :fill="['#333', '#FFF', '#43CCF8']" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <align-text-right-one theme="multi-color" size="24" :fill="['#333', '#FFF', '#43CCF8']" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <row-height size="24" :strokeWidth="2" />
      </button> -->
      <button
        class="menu-btn"
        @click="updateAlign('left')"
        :class="{ 'border border-black bg-gray-200': alignState === 'left' }"
      >
        <align-text-left size="24" :strokeWidth="2" />
      </button>
      <button
        class="menu-btn"
        @click="updateAlign('center')"
        :class="{ 'border border-black bg-gray-200': alignState === 'center' }"
      >
        <align-text-center size="24" :strokeWidth="2" />
      </button>
      <button
        class="menu-btn"
        @click="updateAlign('right')"
        :class="{ 'border border-black bg-gray-200': alignState === 'right' }"
      >
        <align-text-right size="24" :strokeWidth="2" />
      </button>
      <!-- <button class="menu-btn">
        <align-text-both size="24" :strokeWidth="2" />
      </button> -->
    </div>
  </ButtonGroup>
</template>
