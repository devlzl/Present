<script setup lang="ts">
import ToolBar from '../ToolBar/ToolBar.vue'
import SlideList from '../SlideList/SlideList.vue'
import SlideContainer from '../Slide/SlideContainer.vue'
import StatusBar from '../StatusBar/StatusBar.vue'
import Show from '../Show/Show.vue'
import { type SlideMode, slideShowMode, history } from '@Kernel/index'
import { ref, onMounted } from 'vue'

const currentMode = ref<SlideMode>('edit')
slideShowMode.on(async (mode) => {
  if (mode !== 'edit') {
    await document.documentElement.requestFullscreen()
  } else {
    await document.exitFullscreen()
  }
  currentMode.value = mode
})
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    currentMode.value = 'edit'
  }
})

onMounted(() => {
  history.clear()
})
</script>

<template>
  <div v-if="currentMode === 'edit'" class="flex-col flex-none h-screen overflow-hidden text-sm text-secondary-text">
    <ToolBar />
    <div class="flex flex-auto slide-area">
      <SlideList />
      <SlideContainer />
    </div>
    <StatusBar />
  </div>

  <Show v-else :mode="currentMode" />
</template>

<style scoped>
.slide-area {
  height: calc(100vh - 164px);
}
</style>
