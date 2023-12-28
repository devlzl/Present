<script setup lang="ts">
import { Notepad, CuttingOne, CopyOne, Format } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.home.clipboard.title')">
    <div class="flex">
      <button class="menu-btn flex flex-col items-center justify-center">
        <notepad theme="two-tone" size="32" :fill="['#C43E1C', '#FFF']" :strokeWidth="2" />
        <span class="text-xs mt-1">{{ $t('ToolBar.home.clipboard.paste') }}</span>
      </button>
      <div class="flex flex-col">
        <button class="menu-btn py-0 pb-[2px] text-left">
          <cutting-one theme="two-tone" size="18" :fill="['#333', '#83BEEC']" :strokeWidth="2" />
          <span class="text-xs ml-1 align-middle">{{ $t('ToolBar.home.clipboard.cut') }}</span>
        </button>
        <button class="menu-btn py-0 pb-[2px] text-left">
          <copy-one theme="outline" size="18" :strokeWidth="2" />
          <span class="text-xs ml-1">{{ $t('ToolBar.home.clipboard.copy') }}</span>
        </button>
        <button class="menu-btn py-0 pb-[2px] text-left">
          <format theme="two-tone" size="18" :fill="['#333', '#DE6C00']" :strokeWidth="2" />
          <span class="text-xs ml-1">{{ $t('ToolBar.home.clipboard.format') }}</span>
        </button>
      </div>
    </div>
  </MenuWrapper>
</template>
