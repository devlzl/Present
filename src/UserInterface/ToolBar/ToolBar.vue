<script setup lang="ts">
import { history } from '@Kernel/_Kernel'
import { ref } from 'vue'

const canUndo = ref(false)
const canRedo = ref(false)
history.events.update.on(() => {
  canUndo.value = history.canUndo
  canRedo.value = history.canRedo
})
</script>

<template>
  <div class="tool-bar">
    <button @click="history.undo" :disabled="!canUndo">undo</button>
    <button @click="history.redo" :disabled="!canRedo">redo</button>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  height: 90px;
  background-color: #f5f5f5;
}
</style>
