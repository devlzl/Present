<script setup lang="ts">
import { kernel } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'

const slide = kernel.currentSlide
</script>

<template>
  <div class="relative w-[960px] h-[540px] bg-white shadow-lg">
    <component v-for="block of slide.blocks" :is="BlockViews[block.type]" :block="block"></component>
    <div>{{ $t('Common.msg') }}</div>
  </div>
</template>
