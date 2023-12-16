<script setup lang="ts">
import { Store } from '@Kernel/Store'
import { elementViews } from '../ElementViews/_index'

const props = defineProps<{
  store: Store
}>()

const slide = props.store.currentSlide
</script>

<template>
  <div class="slide">
    <component
      v-for="element of slide.elements"
      :is="elementViews[element.name]"
      :model="element"
    ></component>
  </div>
</template>

<style scoped lang="scss">
.slide {
  position: relative;
  width: 960px;
  height: 540px;
  background-color: white;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
}
</style>
