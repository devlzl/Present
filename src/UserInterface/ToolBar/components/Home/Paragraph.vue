<script setup lang="ts">
import {
  ListCheckbox,
  OrderedList,
  AlignTextLeftOne,
  AlignTextRightOne,
  RowHeight,
  AlignTextBoth,
  AlignTextLeft,
  AlignTextRight,
  AlignTextCenter,
} from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.home.paragraph.title')">
    <div class="max-w-[170px] flex flex-wrap items-center text-xs pt-1">
      <button class="menu-btn">
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
      </button>
      <button class="menu-btn">
        <align-text-left size="24" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <align-text-center size="24" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <align-text-right size="24" :strokeWidth="2" />
      </button>
      <button class="menu-btn">
        <align-text-both size="24" :strokeWidth="2" />
      </button>
      <button class="menu-btn w-7 h-7">
        <font-size-two size="16" :strokeWidth="2" />
      </button>
    </div>
  </MenuWrapper>
</template>
