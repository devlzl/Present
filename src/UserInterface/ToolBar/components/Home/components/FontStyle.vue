<script setup lang="ts">
import {
  // FontSizeTwo,
  // AddText,
  ClearFormat,
  TextBold,
  TextItalic,
  TextUnderline,
  Strikethrough,
  Write,
  Platte,
} from '@icon-park/vue-next'
import ButtonGroup from '../../ButtonGroup.vue'
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
import Tooltip from '@UserInterface/components/Tooltip.vue'

const buttonStyle = 'menu-btn w-[32px] h-[30px]'
const activeButtonStyle = 'border border-black bg-gray-200'

const colorInputRef = ref<HTMLElement | null>(null)
const backgroundInputRef = ref<HTMLElement | null>(null)

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

const clearFormat = () => {
  selectionManager.selectedBlocks.forEach((block) => {
    const controller = block.getController()
    if (controller.isFocus()) {
      controller.clearFormat()
    } else {
      block.clearFormatBlock()
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
  <ButtonGroup :name="$t('ToolBar.home.font.title')">
    <div class="max-w-[230px] flex flex-wrap items-center text-xs">
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
      <!-- <button class="menu-btn">
        <FontSizeTwo size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn w-7 h-7">
        <FontSizeTwo size="16" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <AddText theme="outline" size="20" :strokeWidth="2" />
      </button> -->

      <Tooltip text="Clear All Formatting">
        <button :class="buttonStyle" @click="clearFormat">
          <ClearFormat theme="two-tone" size="20" :fill="['#333', '#DE6C00']" :strokeWidth="2" />
        </button>
      </Tooltip>

      <Tooltip text="Bold">
        <button
          :class="{
            [buttonStyle]: true,
            [activeButtonStyle]: fontStyle.bold,
          }"
          @click="format('bold', !fontStyle.bold)"
        >
          <TextBold size="20" :strokeWidth="4" />
        </button>
      </Tooltip>

      <Tooltip text="Italic">
        <button
          :class="{
            [buttonStyle]: true,
            [activeButtonStyle]: fontStyle.italic,
          }"
          @click="format('italic', !fontStyle.italic)"
        >
          <TextItalic size="20" :strokeWidth="2" />
        </button>
      </Tooltip>

      <Tooltip text="Underline">
        <button
          :class="{
            [buttonStyle]: true,
            [activeButtonStyle]: fontStyle.underline,
          }"
          @click="format('underline', !fontStyle.underline)"
        >
          <TextUnderline size="20" :strokeWidth="2" />
        </button>
      </Tooltip>

      <Tooltip text="Strike">
        <button
          :class="{
            [buttonStyle]: true,
            [activeButtonStyle]: fontStyle.strike,
          }"
          @click="format('strike', !fontStyle.strike)"
        >
          <Strikethrough size="20" :strokeWidth="2" />
        </button>
      </Tooltip>

      <Tooltip text="Font Color">
        <button :class="['flex', buttonStyle]" @click="colorInputRef?.click()">
          <write theme="two-tone" size="20" :fill="['#ff0000', '#ffffff']" />
          <input
            ref="colorInputRef"
            type="color"
            :style="{ visibility: 'hidden' }"
            @input="(event) => format('color', (event.target as HTMLInputElement).value)"
          />
        </button>
      </Tooltip>

      <Tooltip text="Text Highlight Color">
        <button :class="['flex', buttonStyle]" @click="backgroundInputRef?.click()">
          <Platte theme="filled" size="20" fill="#f9da74" :strokeWidth="2" />
          <input
            ref="backgroundInputRef"
            type="color"
            :style="{ visibility: 'hidden' }"
            @input="(event) => format('background', (event.target as HTMLInputElement).value)"
          />
        </button>
      </Tooltip>
    </div>
  </ButtonGroup>
</template>
