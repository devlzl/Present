<script setup lang="ts">
const { active, tabs } = defineProps<{
  tabs: { label: string; value: string }[]
  active: string
}>()

const emit = defineEmits(['clickTab'])

const handleClick = (tab: string) => {
  emit('clickTab', tab)
}
</script>

<template>
  <div class="flex flex-nowrap py-1">
    <span
      class="inline-block align-top relative shrink-0 text-center py-1 mx-3 text-secondary-text cursor-pointer after:inline-block after:invisible after:w-full after:h-[2px] after:rounded-sm after:bg-secondary-border after:absolute after:bottom-0 after:left-[50%] after:-translate-x-[50%] hover:after:visible after:transition-[width] after:duration-200 after:ease-[cubic-bezier(0.65, 0.05, 0.36, 1)]"
      :class="{ 'text-primary-text font-semibold after:!visible after:!bg-primary hover:after:!w-[140%]': active === tab.value }"
      v-for="tab in tabs"
      :key="tab.value"
      @click.stop="handleClick(tab.value)"
    >
      {{ $t(tab.label) }}
    </span>
  </div>
</template>
