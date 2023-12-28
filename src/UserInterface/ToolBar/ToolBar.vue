<script setup lang="ts">
import { ref } from 'vue'
import ToolTabs from './components/ToolTabs.vue'
import TabContent from './components/TabContent.vue'
import Home from './components/Home/index.vue'
import { TOOL_TABS } from './const'

const activeTab = ref('Home')
const handleClickTab = (tab: string) => {
  activeTab.value = tab
}

const cpnts: { [key: string]: any } = {
  Home,
}
</script>

<template>
  <div class="bg-secondary">
    <ToolTabs :active="activeTab" :tabs="TOOL_TABS" @click-tab="handleClickTab" />
    <TabContent>
      <component :is="cpnts[activeTab]"></component>
    </TabContent>
  </div>
</template>
