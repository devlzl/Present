<script setup lang="ts">
import ToolBar from '../ToolBar/ToolBar.vue'
import SideBar from '../SideBar/SideBar.vue'
import SlideContainer from '../Slide/SlideContainer.vue'
import StatusBar from '../StatusBar/StatusBar.vue'
</script>

<template>
  <div class="text-sm text-secondary-text h-screen flex flex-col">
    <ToolBar />
    <div class="flex-auto flex">
      <SideBar />
      <SlideContainer />
    </div>
    <StatusBar />
  </div>
</template>
