<script setup lang="ts">
import ToolBar from '../ToolBar/ToolBar.vue'
import SideBar from '../SideBar/SideBar.vue'
import SlideContainer from '../Slide/SlideContainer.vue'
import StatusBar from '../StatusBar/StatusBar.vue'
</script>

<template>
  <div class="flex-col flex-none h-screen overflow-hidden text-sm text-secondary-text">
    <ToolBar />
    <div class="flex flex-auto slider-content">
      <SideBar />
      <SlideContainer />
    </div>
    <StatusBar />
  </div>
</template>

<style scoped>
.slider-content {
  height: calc(100vh - 164px);
}
</style>
