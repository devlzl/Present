<script setup lang="ts">
import { type SlideMode, slideManager } from '@Kernel/index'
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { Logout, ArrowCircleLeft, ArrowCircleRight } from '@icon-park/vue-next'
import Block from './components/Block.vue'
import { DEFAULT_SLIDE_WIDTH, SLIDE_RATIO } from '@Const/slide'

const { mode } = defineProps<{
  mode: SlideMode
}>()

const slide = shallowRef(slideManager.currentSlide)
onMounted(() => {
  if (mode === 'start') {
    slideManager.changeSlide(0)
  }
})
slideManager.events.update.on(async () => {
  slide.value = slideManager.currentSlide
  slide.value.startAnimation()
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

const height = ref(window.innerWidth / SLIDE_RATIO)
const scale = ref(window.innerWidth / DEFAULT_SLIDE_WIDTH)
const calcSize = () => {
  height.value = window.innerWidth / SLIDE_RATIO
  scale.value = window.innerWidth / DEFAULT_SLIDE_WIDTH
}
onMounted(() => {
  window.addEventListener('resize', calcSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', calcSize)
})
</script>

<template>
  <div class="relative w-screen h-screen bg-black flex items-center" @click="slideManager.goNext">
    <div class="relative bg-white w-screen overflow-hidden" :style="{ height: `${height}px` }">
      <Block v-for="block of slide.blocks" :block="block" :scale="scale" />
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
  </div>
</template>
