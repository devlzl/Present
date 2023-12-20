<script setup lang="ts">
import { history } from '@Kernel/_Kernel'
import { ref } from 'vue'
import ToolTabs from './components/ToolTabs.vue';
import TabContent from './components/TabContent.vue';

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
  <div class="tool-bar">
    <div>
      <button @click="history.undo" :disabled="!canUndo">undo</button>
      <button @click="history.redo" :disabled="!canRedo">redo</button>
    </div>
    
    <ToolTabs @click-tab="handleClickTab"/>
    <TabContent/>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  background-color: #f5f5f5;
}
</style>
