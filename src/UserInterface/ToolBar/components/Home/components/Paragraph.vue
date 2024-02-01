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
import ButtonGroup from '../../ButtonGroup.vue'
import { AlignType, TextBoxBlock } from '@BlockHub/TextBoxBlock/TextBoxBlock'
import { selectionManager } from '@Kernel/index'
import { ref, shallowRef } from 'vue'
import { computed } from 'vue'
import Tooltip from '@UserInterface/components/Tooltip.vue'

const buttonStyle = 'menu-btn w-[34px] h-[34px]'
const activeButtonStyle = 'border border-black bg-gray-200'

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
      <Tooltip text="Align Left">
        <button
          class="menu-btn"
          @click="updateAlign('left')"
          :class="{
            [buttonStyle]: true,
            [activeButtonStyle]: alignState === 'left',
          }"
        >
          <AlignTextLeft size="24" :strokeWidth="2" />
        </button>
      </Tooltip>

      <Tooltip text="Center Text">
        <button
          class="menu-btn"
          @click="updateAlign('center')"
          :class="{
            [buttonStyle]: true,
            [activeButtonStyle]: alignState === 'center',
          }"
        >
          <AlignTextCenter size="24" :strokeWidth="2" />
        </button>
      </Tooltip>

      <Tooltip text="Align Right">
        <button
          class="menu-btn"
          @click="updateAlign('right')"
          :class="{
            [buttonStyle]: true,
            [activeButtonStyle]: alignState === 'right',
          }"
        >
          <AlignTextRight size="24" :strokeWidth="2" />
        </button>
      </Tooltip>

      <!-- <button class="menu-btn">
        <align-text-both size="24" :strokeWidth="2" />
      </button> -->
    </div>
  </ButtonGroup>
</template>
