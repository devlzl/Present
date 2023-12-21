<script setup lang="ts">
import { ref } from 'vue'
import { TOOL_TABS } from '../const'

const emit = defineEmits(['clickTab'])

const tabs = ref<{ label: string; value: string }[]>(TOOL_TABS)
const activeTab = ref(tabs.value[0].value)
const handleClick = (tab: string) => {
  activeTab.value = tab
  emit('clickTab', tab)
}
</script>

<template>
  <div class="tool-tabs-container">
    <span
      class="tab-item"
      :class="{ 'tab-active': activeTab === tab.value }"
      v-for="tab in tabs"
      :key="tab.value"
      @click.stop="handleClick(tab.value)"
    >
      {{ $t(tab.label) }}
    </span>
  </div>
</template>

<style scoped lang="scss">
$theme-color: #c43e1c;

.tool-tabs-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 4px 0;
  .tab-item {
    display: inline-block;
    vertical-align: top;
    position: relative;
    flex-shrink: 0;
    text-align: center;
    padding: 4px 0 4px;
    margin: 0 12px;
    color: #424242;
    cursor: pointer;
    &::after {
      content: '';
      display: inline-block;
      visibility: hidden;
      width: 100%;
      height: 2px;
      border-radius: 1px;
      background-color: #d8d8d8;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    &:hover {
      &::after {
        visibility: visible;
      }
    }
    &.tab-active {
      color: #242424;
      font-weight: 600;
      &::after {
        visibility: visible;
        background-color: $theme-color;
        transition: width 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
      }
      &:hover {
        &::after {
          width: 140%;
        }
      }
    }
  }
}
</style>
