<script setup lang="ts">
import { FontSizeTwo, AddText, ClearFormat, TextBold, TextItalic, TextUnderline, Strikethrough, BackgroundColor } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
import { kernel } from '@Kernel/index'

kernel.richTextObserver.on((newState) => {
  console.log('newState', newState)
})
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.home.font.title')">
    <div class="max-w-[320px] flex flex-wrap items-center text-xs">
      <div class="mr-1 mt-1 mb-2">
        <select class="w-32 h-6 border rounded rounded-r-none">
          <option :value="'宋体'">{{ '宋体' }}</option>
          <option :value="'Aria'">{{ 'Aria' }}</option>
          <option :value="'微软雅黑'">{{ '微软雅黑' }}</option>
        </select>
        <select class="w-16 h-6 border rounded border-l-0 rounded-l-none">
          <option :value="'12'">{{ '12' }}</option>
          <option :value="'14'">{{ '14' }}</option>
          <option :value="'16'">{{ '16' }}</option>
          <option :value="'18'">{{ '18' }}</option>
          <option :value="'20'">{{ '20' }}</option>
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
      <button class="menu-btn px-2">
        <text-bold size="20" :strokeWidth="4" />
      </button>
      <button class="menu-btn px-2">
        <text-italic size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn px-2">
        <text-underline size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn px-2">
        <strikethrough size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn px-2">
        <background-color size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn px-2 w-7 h-7">
        <font-size-two size="16" :strokeWidth="2" />
      </button>
    </div>
  </MenuWrapper>
</template>
