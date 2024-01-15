<script setup lang="ts">
import { TextRecognition } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { toolBox } from '@Kernel/index'
import ToolButton from '../ToolButton.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.textBox.title')">
    <ToolButton :clickHandler="() => toolBox.events.toolChange.emit('TextBox')">
      <template #icon>
        <TextRecognition
          class="mb-1"
          theme="multi-color"
          size="32"
          :fill="['#333', '#83beec', '#FFF', '#43CCF8']"
          :strokeWidth="2"
        />
      </template>
      <template #name>{{ $t('ToolBar.insert.textBox.title') }}</template>
    </ToolButton>
  </ButtonGroup>
</template>
