<script setup lang="ts">
import { Slide } from '@icon-park/vue-next'
import { slideManager } from '@Kernel/index'
import ButtonGroup from '../../ButtonGroup.vue'
import ToolButton from '../../ToolButton.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.slides.title')">
    <ToolButton :clickHandler="() => slideManager.insertSlide()">
      <template #icon>
        <Slide theme="multi-color" size="32" :fill="['#333', '#FFF', '#379E4E', '#379E4E']" :strokeWidth="2" />
      </template>
      <template #name>{{ $t('ToolBar.home.slides.add') }}</template>
    </ToolButton>
  </ButtonGroup>
</template>
