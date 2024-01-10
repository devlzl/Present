<script setup lang="ts">
import { Ppt, SlideTwo } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
import { slideShowMode } from '@Kernel/index'

const show = (mode: 'start' | 'current') => {
  slideShowMode.emit(mode)
}
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.slideshow.startSlideShow.title')">
    <div class="flex items-start gap-[10px]">
      <button class="menu-btn flex flex-col items-center" @click="show('start')">
        <Ppt theme="outline" size="32" fill="#333" :strokeWidth="2" />
        <span class="text-xs mt-1">{{ $t('ToolBar.slideshow.startSlideShow.begin') }}</span>
      </button>
      <button class="menu-btn flex flex-col items-center" @click="show('current')">
        <SlideTwo theme="outline" size="32" fill="#333" :strokeWidth="2" />
        <span class="text-xs mt-1">{{ $t('ToolBar.slideshow.startSlideShow.current') }}</span>
      </button>
    </div>
  </MenuWrapper>
</template>
