<script setup lang="ts">
import { TextRecognition, Down } from '@icon-park/vue-next';
import MenuWrapper from '../MenuWrapper.vue'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.insert.textBox.title')">
    <button class="flex flex-col items-center py-0 menu-btn">
      <TextRecognition class="mb-1" theme="multi-color" size="32" :fill="['#333' ,'#83beec' ,'#FFF' ,'#43CCF8']" :strokeWidth="2"/>
      <span class="text-xs">{{ $t('ToolBar.insert.textBox.title') }}</span>
      <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2"/>
    </button>
  </MenuWrapper>
</template>
