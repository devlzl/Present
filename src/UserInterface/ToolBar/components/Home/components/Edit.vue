<script setup lang="ts">
import { Search, DataSwitching } from '@icon-park/vue-next'
import ButtonGroup from '../../ButtonGroup.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.home.editing.title')">
    <div class="flex flex-col">
      <button class="menu-btn py-0 pb-[2px] text-left">
        <search theme="outline" size="18" fill="#333" :strokeWidth="2" />
        <span class="text-xs ml-1 align-middle">{{ $t('ToolBar.home.editing.find') }}</span>
      </button>
      <button class="menu-btn py-0 pb-[2px] text-left">
        <data-switching theme="two-tone" size="18" :fill="['#333', '#A846B2']" :strokeWidth="2" />
        <span class="text-xs ml-1">{{ $t('ToolBar.home.editing.replace') }}</span>
      </button>
    </div>
  </ButtonGroup>
</template>
