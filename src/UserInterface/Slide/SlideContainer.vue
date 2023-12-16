<script setup lang="ts">
import { Store } from '@Kernel/Store'
import Slide from './Slide.vue'

const props = defineProps<{
  store: Store
}>()
</script>

<template>
  <div class="slide-container">
    <Slide :store="props.store" />
  </div>
</template>

<style scoped lang="scss">
.slide-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
}
</style>
