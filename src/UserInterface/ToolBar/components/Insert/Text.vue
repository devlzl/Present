<script setup lang="ts">
import { TextRecognition } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { toolBox } from '@Kernel/index'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.textBox.title')">
    <button class="flex flex-col items-center py-0 menu-btn" @click="toolBox.events.toolChange.emit('TextBox')">
      <TextRecognition
        class="mb-1"
        theme="multi-color"
        size="32"
        :fill="['#333', '#83beec', '#FFF', '#43CCF8']"
        :strokeWidth="2"
      />
      <span class="text-xs">{{ $t('ToolBar.insert.textBox.title') }}</span>
    </button>
  </ButtonGroup>
</template>
