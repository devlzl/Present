<script setup lang="ts">
const { name } = defineProps<{
  name: string
}>()
</script>

<template>
  <div class="inline-flex flex-col-reverse justify-between items-center px-2 border-r">
    <div class="text-2xs">{{ name }}</div>
    <slot></slot>
  </div>
</template>
