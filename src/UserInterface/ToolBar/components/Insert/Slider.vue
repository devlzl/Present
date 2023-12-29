<script setup lang="ts">
import { FileAdditionOne, Down } from '@icon-park/vue-next';
import MenuWrapper from '../MenuWrapper.vue'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.insert.slider.title')">
    <button class="flex flex-col items-center py-0 menu-btn">
      <span class="text-xs">{{ $t('ToolBar.insert.slider.add') }}</span>
      <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2"/>
    </button>
    <button class="flex flex-col items-center px-4 menu-btn">
      <FileAdditionOne theme="outline" size="32" fill="#333" :strokeWidth="2"/>
    </button>
  </MenuWrapper>
</template>
