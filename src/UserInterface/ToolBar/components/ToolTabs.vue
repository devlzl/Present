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
  <div class="flex flex-nowrap py-[4px]">
    <span
      class="inline-block align-top relative shrink-0 text-center py-[4px] mx-[12px] text-secondary-text cursor-pointer after:inline-block after:invisible after:w-full after:h-[2px] after:rounded-sm after:bg-secondary-border after:absolute after:bottom-0 after:left-[50%] after:-translate-x-[50%] hover:after:visible hover:after:transition-[width] hover:after:duration-200 hover:after:ease-[cubic-bezier(0.65, 0.05, 0.36, 1)]"
      :class="{ 'text-primary-text font-semibold after:!visible after:!bg-primary hover:after:!w-[140%]': activeTab === tab.value }"
      v-for="tab in tabs"
      :key="tab.value"
      @click.stop="handleClick(tab.value)"
    >
      {{ $t(tab.label) }}
    </span>
  </div>
</template>
