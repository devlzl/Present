<script setup lang="ts">
import { Symbol, Down } from '@icon-park/vue-next'
import ButtonGroup from '../../ButtonGroup.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.symbol.title')">
    <button class="flex flex-col items-center py-0 menu-btn">
      <Symbol class="mb-1" theme="outline" size="32" fill="#333" :strokeWidth="2" />
      <span class="text-xs">{{ $t('ToolBar.insert.symbol.title') }}</span>
      <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
    </button>
  </ButtonGroup>
</template>
