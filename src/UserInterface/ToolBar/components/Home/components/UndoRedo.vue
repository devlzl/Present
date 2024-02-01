<script setup lang="ts">
import { ref } from 'vue'
import { history } from '@Kernel/index'
import { Undo, Redo } from '@icon-park/vue-next'
import ButtonGroup from '../../ButtonGroup.vue'
import { onMounted } from 'vue'

const canUndo = ref(false)
const canRedo = ref(false)
onMounted(() => {
  canUndo.value = history.canUndo
  canRedo.value = history.canRedo
})
history.events.update.on(() => {
  canUndo.value = history.canUndo
  canRedo.value = history.canRedo
})
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.home.undo')">
    <div class="flex flex-col">
      <button class="menu-btn" @click="history.undo" :disabled="!canUndo">
        <Undo theme="outline" size="20" :strokeWidth="2" />
      </button>
      <button class="menu-btn" @click="history.redo" :disabled="!canRedo">
        <Redo theme="outline" size="20" :strokeWidth="2" />
      </button>
    </div>
  </ButtonGroup>
</template>
