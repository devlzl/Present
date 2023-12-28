<script setup lang="ts">
import { Close } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.home.delete')">
    <button class="menu-btn flex flex-col items-center">
      <close theme="outline" size="32" fill="#ED3D3B" :strokeWidth="2" />
      <span class="text-xs mt-1">{{ $t('ToolBar.home.delete') }}</span>
    </button>
  </MenuWrapper>
</template>
