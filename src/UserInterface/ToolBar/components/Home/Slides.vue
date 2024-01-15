<script setup lang="ts">
import { Slide, Copy } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { slideManager } from '@Kernel/index'
import ToolButton from '../ToolButton.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.home.slides.title')">
    <div class="flex items-start">
      <ToolButton :clickHandler="() => slideManager.insertSlide()">
        <template #icon>
          <Slide theme="multi-color" size="32" :fill="['#333', '#FFF', '#379E4E', '#379E4E']" :strokeWidth="2" />
        </template>
        <template #name>{{ $t('ToolBar.home.slides.add') }}</template>
      </ToolButton>

      <!-- <button class="menu-btn py-1">
        <copy theme="two-tone" size="18" :fill="['#333', '#DE6C00']" :strokeWidth="2" />
        <span class="text-xs ml-1">{{ $t('ToolBar.home.slides.duplicate') }}</span>
      </button> -->
    </div>
  </ButtonGroup>
</template>
