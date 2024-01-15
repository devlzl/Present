<script setup lang="ts">
import { type SlideMode, slideManager } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { Logout, ArrowCircleLeft, ArrowCircleRight } from '@icon-park/vue-next'

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

const quit = async () => {
  await document.exitFullscreen()
}
</script>

<template>
  <div class="relative w-screen h-screen" @click="slideManager.goNext">
    <component v-for="block of slide.blocks" :key="block.id" :is="BlockViews[block.type]" :block="block"></component>
    <div class="absolute w-full h-full left-0 top-0 opacity-0"></div>
    <div class="absolute left-[10px] bottom-[10px] flex gap-[10px]">
      <button class="menu-btn" @click.stop="slideManager.goPrevious">
        <ArrowCircleLeft theme="two-tone" size="36" :fill="['#333', '#ffffff']" />
      </button>
      <button class="menu-btn" @click.stop="slideManager.goNext">
        <ArrowCircleRight theme="two-tone" size="36" :fill="['#333', '#ffffff']" />
      </button>
      <button class="menu-btn" @click.stop="quit">
        <Logout theme="two-tone" size="36" :fill="['#333', '#ffffff']" />
      </button>
    </div>
  </div>
</template>
