<script setup lang="ts">
import { TableFile, Down } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.insert.table.title')">
    <button class="flex flex-col items-center py-0 menu-btn">
      <TableFile class="mb-1" theme="outline" size="32" fill="#333" :strokeWidth="2" />
      <span class="text-xs">{{ $t('ToolBar.insert.table.title') }}</span>
      <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
    </button>
  </MenuWrapper>
</template>
