<script setup lang="ts">
import ToolTabs from './components/ToolTabs.vue';
import TabContent from './components/TabContent.vue';

const handleClickTab = (tab: string) => {
  console.log('---- tab: ', tab)
}

</script>

<template>
  <div class="tool-bar">
    <ToolTabs @click-tab="handleClickTab"/>
    <TabContent/>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  background-color: #f5f5f5;
}
</style>
