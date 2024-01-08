<script setup lang="ts">
import ToolBar from '../ToolBar/ToolBar.vue'
import SlideList from '../SlideList/SlideList.vue'
import SlideContainer from '../Slide/SlideContainer.vue'
import StatusBar from '../StatusBar/StatusBar.vue'
</script>

<template>
  <div class="flex-col flex-none h-screen overflow-hidden text-sm text-secondary-text">
    <ToolBar />
    <div class="flex flex-auto slide-area">
      <SlideList />
      <SlideContainer />
    </div>
    <StatusBar />
  </div>
</template>

<style scoped>
.slide-area {
  height: calc(100vh - 164px);
}
</style>
