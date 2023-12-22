<script setup lang="ts">
import { kernel } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'

const slide = kernel.currentSlide
</script>

<template>
  <div class="slide">
    <component v-for="block of slide.blocks" :is="BlockViews[block.type]" :block="block"></component>
    <div>{{ $t('Common.msg') }}</div>
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
