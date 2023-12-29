<script setup lang="ts">
import { Stickers, BackgroundColor, Copy, Platte, GraphicDesign, BringToFrontOne } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.home.drawing.title')">
    <div class="flex">
      <button class="menu-btn flex flex-col items-center justify-center">
        <graphic-design theme="two-tone" size="32" :fill="['#333', '#83BEEC']" :strokeWidth="1" />
        <span class="text-xs mt-1">{{ $t('ToolBar.home.drawing.shapes') }}</span>
      </button>
      <button class="menu-btn flex flex-col items-center justify-center">
        <bring-to-front-one theme="two-tone" size="32" :fill="['#333', '#F8DB8F']" :strokeWidth="1" />
        <span class="text-xs mt-1">{{ $t('ToolBar.home.drawing.arrange') }}</span>
      </button>
      <button class="menu-btn flex flex-col items-center justify-center">
        <stickers theme="two-tone" size="32" :fill="['#333', '#DE6C00']" :strokeWidth="1" />
        <span class="text-xs mt-1">{{ $t('ToolBar.home.drawing.style') }}</span>
      </button>
      <div class="flex flex-col">
        <button class="menu-btn py-0 pb-[2px] text-left">
          <background-color theme="two-tone" size="18" :fill="['#333', '#83BEEC']" :strokeWidth="2" />
          <span class="text-xs ml-1 align-middle">{{ $t('ToolBar.home.drawing.shapeFill') }}</span>
        </button>
        <button class="menu-btn py-0 pb-[2px] text-left">
          <platte theme="multi-color" size="18" :fill="['#333', '#FFF', '#83BEEC', '#83BEEC']" :strokeWidth="2" />
          <span class="text-xs ml-1">{{ $t('ToolBar.home.drawing.shapeOutline') }}</span>
        </button>
        <button class="menu-btn py-0 pb-[2px] text-left">
          <copy theme="two-tone" size="18" :fill="['#333', '#83BEEC']" :strokeWidth="2" />
          <span class="text-xs ml-1">{{ $t('ToolBar.home.drawing.duplicate') }}</span>
        </button>
      </div>
    </div>
  </MenuWrapper>
</template>
