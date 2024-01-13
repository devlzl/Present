<script setup lang="ts">
import { Slide } from '@icon-park/vue-next'
import { slideManager } from '@Kernel/index'
import ButtonGroup from '../ButtonGroup.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.slides.title')">
    <button class="menu-btn flex flex-col items-center" @click="slideManager.insertSlide()">
      <Slide theme="multi-color" size="32" :fill="['#333', '#FFF', '#379E4E', '#379E4E']" :strokeWidth="2" />
      <span class="text-xs mt-1">{{ $t('ToolBar.home.slides.add') }}</span>
    </button>
  </ButtonGroup>
</template>
