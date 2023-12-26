<script setup lang="ts">
import { history } from '@Kernel/index'
import { ref } from 'vue'
import ToolTabs from './components/ToolTabs.vue'
import TabContent from './components/TabContent.vue'

const canUndo = ref(false)
const canRedo = ref(false)
history.events.update.on(() => {
  canUndo.value = history.canUndo
  canRedo.value = history.canRedo
})

const handleClickTab = (tab: string) => {
  console.log('---- tab: ', tab)
}
</script>

<template>
  <div class="bg-secondary">
    <div>
      <button
        class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white disabled:bg-secondary disabled:text-secondary-border disabled:border-secondary-border disabled:cursor-not-allowed m-2 px-2"
        @click="history.undo"
        :disabled="!canUndo"
      >
        undo
      </button>
      <button
        class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white disabled:bg-secondary disabled:text-secondary-border disabled:border-secondary-border disabled:cursor-not-allowed m-2 px-2"
        @click="history.redo"
        :disabled="!canRedo"
      >
        redo
      </button>
    </div>

    <ToolTabs @click-tab="handleClickTab" />
    <TabContent />
  </div>
</template>
