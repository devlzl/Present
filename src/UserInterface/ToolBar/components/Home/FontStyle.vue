<script setup lang="ts">
import {
  FontSizeTwo,
  AddText,
  ClearFormat,
  TextBold,
  TextItalic,
  TextUnderline,
  Strikethrough,
} from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
import { richTextObserver } from '@Kernel/index'
import { selectionBlk } from '@Kernel/index'
import { intersectAttributes } from '@Utils/intersectAttributes'
import { ref } from 'vue'
import { type AttributeValue } from '@Kernel/Store/TextStore'

const format = (name: string, value: AttributeValue) => {
  selectionBlk.blocks.forEach((block) => {
    const controller = block.getController()
    if (controller.isFocus()) {
      controller.format(name, value)
    } else {
      block.formatBlock(name, value)
    }
  })
}

const fontStyle = ref()
selectionBlk.events.update.on(() => {
  const selectedBlocksFormat = selectionBlk.blocks.map((block) => block.getBlockFormat())
  fontStyle.value = intersectAttributes(selectedBlocksFormat)
})
richTextObserver.on(async (newState) => {
  const richTextAttributes = newState.atoms.map((atom) => atom.attributes)
  fontStyle.value = intersectAttributes(richTextAttributes)
})
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.home.font.title')">
    <div class="max-w-[320px] flex flex-wrap items-center text-xs">
      <div class="mr-1 mt-1 mb-2">
        <select
          class="w-32 h-6 border rounded rounded-r-none"
          @change="(event) => format('fontFamily', (event.target as HTMLSelectElement).value)"
        >
          <option v-for="option in ['sans-serif', 'serif', 'monospace']" :value="option">
            {{ option }}
          </option>
        </select>

        <select
          class="w-16 h-6 border rounded border-l-0 rounded-l-none"
          @change="(event) => format('fontSize', (event.target as HTMLSelectElement).value)"
        >
          <option v-for="option in [16, 20, 24, 28, 32]" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <button class="menu-btn">
        <font-size-two size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn w-7 h-7">
        <font-size-two size="16" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <add-text theme="outline" size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <clear-format theme="two-tone" size="20" :fill="['#333', '#DE6C00']" :strokeWidth="2" />
      </button>
      <button
        class="menu-btn px-2"
        :class="{
          'border border-black bg-gray-200': fontStyle?.bold,
        }"
        @click.stop="format('bold', !fontStyle?.bold)"
      >
        <text-bold size="20" :strokeWidth="4" />
      </button>
      <button
        class="menu-btn px-2"
        :class="{
          'border border-black bg-gray-200': fontStyle?.italic,
        }"
        @click.stop="format('italic', !fontStyle?.italic)"
      >
        <text-italic size="20" :strokeWidth="2" />
      </button>
      <button
        class="menu-btn px-2"
        :class="{
          'border border-black bg-gray-200': fontStyle?.underline,
        }"
        @click.stop="format('underline', !fontStyle?.underline)"
      >
        <text-underline size="20" :strokeWidth="2" />
      </button>
      <button
        class="menu-btn px-2"
        :class="{
          'border border-black bg-gray-200': fontStyle?.strike,
        }"
        @click.stop="format('strike', !fontStyle?.strike)"
      >
        <strikethrough size="20" :strokeWidth="2" />
      </button>
      <input type="color" @input="(event) => format('color', (event.target as HTMLInputElement).value)" />
      <input type="color" @input="(event) => format('background', (event.target as HTMLInputElement).value)" />
      <!-- 
      <button class="menu-btn px-2">
        <background-color size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn px-2 w-7 h-7">
        <font-size-two size="16" :strokeWidth="2" />
      </button> -->
    </div>
  </MenuWrapper>
</template>
