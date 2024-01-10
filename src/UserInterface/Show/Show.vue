<script setup lang="ts">
import { type SlideMode, slideManager } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'
import { shallowRef } from 'vue'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'

const { mode } = defineProps<{
  mode: SlideMode
}>()

const slide = shallowRef(slideManager.currentSlide)
onMounted(() => {
  if (mode === 'start') {
    slideManager.changeSlide(0)
  }
})
slideManager.events.update.on(() => {
  slide.value = slideManager.currentSlide
})

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    slideManager.goPrevious()
  } else if (event.key === 'ArrowDown') {
    slideManager.goNext()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div class="w-screen h-screen" @click="slideManager.goNext()">
    <component v-for="block of slide.blocks" :key="block.id" :is="BlockViews[block.type]" :block="block"></component>
    <div class="absolute w-full h-full left-0 top-0 opacity-0"></div>
  </div>
</template>
