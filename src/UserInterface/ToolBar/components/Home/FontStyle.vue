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
import { richTextObserver, selectionManager } from '@Kernel/index'
import { intersectAttributes } from '@Utils/intersectAttributes'
import { ref } from 'vue'
import type { AttributeName, AttributeValue, Attributes } from '@Kernel/Store/TextStore'
import {
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  FONT_FAMILY_RANGE,
  FONT_SIZE_RANGE,
} from '@Const/font'

const buttonStyle = 'menu-btn w-[40px] h-[30px]'
const activeButtonStyle = 'border border-black bg-gray-200'

const format = (name: AttributeName, value: AttributeValue) => {
  selectionManager.selectedBlocks.forEach((block) => {
    const controller = block.getController()
    if (controller.isFocus()) {
      controller.format(name, value)
    } else {
      block.formatBlock(name, value)
    }
  })
}

const fontStyle = ref<Attributes>({
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  color: DEFAULT_FONT_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
})
selectionManager.events.update.on(() => {
  const selectedBlocksFormat = selectionManager.selectedBlocks.map((block) => block.getBlockFormat())
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
          :value="fontStyle.fontFamily ?? DEFAULT_FONT_FAMILY"
          @change="(event) => format('fontFamily', (event.target as HTMLSelectElement).value)"
        >
          <option v-for="option in FONT_FAMILY_RANGE" :value="option">
            {{ option }}
          </option>
        </select>

        <select
          class="w-16 h-6 border rounded border-l-0 rounded-l-none"
          :value="fontStyle.fontSize ?? DEFAULT_FONT_SIZE"
          @change="(event) => format('fontSize', (event.target as HTMLSelectElement).value)"
        >
          <option v-for="option in FONT_SIZE_RANGE" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <button class="menu-btn">
        <FontSizeTwo size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn w-7 h-7">
        <FontSizeTwo size="16" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <AddText theme="outline" size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <ClearFormat theme="two-tone" size="20" :fill="['#333', '#DE6C00']" :strokeWidth="2" />
      </button>
      <button
        :class="{
          [buttonStyle]: true,
          [activeButtonStyle]: fontStyle.bold,
        }"
        @click="format('bold', !fontStyle.bold)"
      >
        <TextBold size="20" :strokeWidth="4" />
      </button>
      <button
        :class="{
          [buttonStyle]: true,
          [activeButtonStyle]: fontStyle.italic,
        }"
        @click="format('italic', !fontStyle.italic)"
      >
        <TextItalic size="20" :strokeWidth="2" />
      </button>
      <button
        :class="{
          [buttonStyle]: true,
          [activeButtonStyle]: fontStyle.underline,
        }"
        @click="format('underline', !fontStyle.underline)"
      >
        <TextUnderline size="20" :strokeWidth="2" />
      </button>
      <button
        :class="{
          [buttonStyle]: true,
          [activeButtonStyle]: fontStyle.strike,
        }"
        @click="format('strike', !fontStyle.strike)"
      >
        <Strikethrough size="20" :strokeWidth="2" />
      </button>
      <input type="color" @input="(event) => format('color', (event.target as HTMLInputElement).value)" />
      <input type="color" @input="(event) => format('background', (event.target as HTMLInputElement).value)" />
    </div>
  </MenuWrapper>
</template>
