<script setup lang="ts">
import ToolBar from '../ToolBar/ToolBar.vue'
import SideBar from '../SideBar/SideBar.vue'
import SlideContainer from '../Slide/SlideContainer.vue'
import StatusBar from '../StatusBar/StatusBar.vue'
import { Store } from '@Kernel/Store'

const store = new Store()
</script>

<template>
  <div class="present">
    <ToolBar />
    <div class="main">
      <SideBar />
      <SlideContainer :store="store" />
    </div>
    <StatusBar />
  </div>
</template>

<style scoped lang="scss">
.present {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main {
    flex: 1;
    display: flex;
  }
}
</style>
