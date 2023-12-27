<script setup lang="ts">
import { history } from '@Kernel/index'
import { Undo, Redo } from '@icon-park/vue-next'
import { ref } from 'vue'

const canUndo = ref(false)
const canRedo = ref(false)
history.events.update.on(() => {
  canUndo.value = history.canUndo
  canRedo.value = history.canRedo
})
</script>

<template>
  <div class="inline-flex flex-col-reverse justify-between items-center px-2 border-r">
    <div class="text-2xs">{{ $t('ToolBar.home.undo') }}</div>
    <div class="flex flex-col">
      <button
        class="rounded hover:bg-secondary disabled:text-secondary-border disabled:hover:bg-white disabled:cursor-not-allowed p-1"
        @click="history.undo"
        :disabled="!canUndo"
      >
        <undo theme="outline" size="20" :strokeWidth="2" />
      </button>
      <button
        class="rounded hover:bg-secondary disabled:text-secondary-border disabled:hover:bg-white disabled:cursor-not-allowed p-1"
        @click="history.redo"
        :disabled="!canRedo"
      >
        <redo theme="outline" size="20" :strokeWidth="2" />
      </button>
    </div>
  </div>
</template>
