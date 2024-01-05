<script setup lang="ts">
import { ref, watch } from 'vue';
import { kernel } from '@Kernel/index'
import type { Slide } from '@Kernel/Slide';
import { BlockViews } from '@BlockHub/BlockHub'

const slide = ref<Slide>(kernel.currentSlide);

watch(
  () => kernel.currentIndex,
  () => {
    slide.value = kernel.currentSlide;
  }
);
</script>

<template>
  <div class="relative w-[960px] h-[540px] bg-white shadow-lg">
    <component v-for="block of slide.blocks" :is="BlockViews[block.type]" :block="block"></component>
  </div>
</template>
