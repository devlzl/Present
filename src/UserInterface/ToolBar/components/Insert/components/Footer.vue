<script setup lang="ts">
import { DocDetail, Down } from '@icon-park/vue-next'
import ButtonGroup from '../../ButtonGroup.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.footer.title')">
    <button class="flex flex-col items-center py-0 menu-btn">
      <DocDetail
        class="mb-1"
        theme="multi-color"
        size="32"
        :fill="['#333', '#83beec', '#FFF', '#43CCF8']"
        :strokeWidth="2"
      />
      <span class="text-xs">{{ $t('ToolBar.insert.footer.title') }}</span>
      <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
    </button>
  </ButtonGroup>
</template>
