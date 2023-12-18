<script setup lang="ts">
import { elementViews } from '../ElementViews/_index'
import { kernel } from '@Kernel/_Kernel'

const slide = kernel.currentSlide
</script>

<template>
  <div class="slide">
    <component
      v-for="element of slide.elements"
      :is="elementViews[element.name]"
      :model="element"
    ></component>
    <div>{{ $t('msg') }}</div>
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
