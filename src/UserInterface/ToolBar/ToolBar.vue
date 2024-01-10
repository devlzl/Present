<script setup lang="ts">
import { ref, type Component } from 'vue'
import ToolTabs from './components/ToolTabs.vue'
import TabContent from './components/TabContent.vue'
import Home from './components/Home/index.vue'
import Insert from './components/Insert/Index.vue'
import SlideShow from './components/SlideShow/index.vue'
import { TOOL_TABS } from './const'

const activeTab = ref('Home')
const handleClickTab = (tab: string) => {
  activeTab.value = tab
}

const components: { [key: string]: Component } = {
  Home,
  Insert,
  SlideShow,
}
</script>

<template>
  <div class="bg-secondary">
    <ToolTabs :active="activeTab" :tabs="TOOL_TABS" @click-tab="handleClickTab" />
    <TabContent>
      <component :is="components[activeTab]"></component>
    </TabContent>
  </div>
</template>
