<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { slideManager } from '@Kernel/index'
import { BlockViews } from '@BlockHub/BlockHub'
import { DEFAULT_SLIDE_WIDTH, DEFAULT_SLIDE_HEIGHT } from '@Const/slide'

const currentIndex = ref(slideManager.currentIndex)
const slides = shallowRef(slideManager.slides)
slideManager.events.update.on(() => {
  currentIndex.value = slideManager.currentIndex
  slides.value = slideManager.slides
})

const draggingIndex = ref(-1)
const dropIndex = ref(-1)
const onDragOver = (event: DragEvent, index: number) => {
  ;(event.dataTransfer as DataTransfer).dropEffect = 'move'
  const { y, height } = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const { clientY } = event
  if (draggingIndex.value < index) {
    // from top to bottom
    if (clientY < y + height / 2) {
      dropIndex.value = index - 1
    } else {
      dropIndex.value = index
    }
  } else if (draggingIndex.value > index) {
    // from bottom to top
    if (clientY < y + height / 2) {
      dropIndex.value = index
    } else {
      dropIndex.value = index + 1
    }
  } else {
    dropIndex.value = index
  }
}
const onDrop = () => {
  slideManager.changeSlide(dropIndex.value)
  if (draggingIndex.value !== dropIndex.value) {
    slideManager.move(draggingIndex.value, dropIndex.value)
    dropIndex.value = -1
  }
}
</script>

<template>
  <div
    class="slide-list w-[250px] bg-secondary border-r border-secondary-border flex flex-col gap-[20px] pl-[26px] pt-[20px] pb-[20px] overflow-y-auto"
  >
    <div class="relative" v-for="(slide, index) of slides" :key="slide.id" @click="slideManager.changeSlide(index)">
      <div class="index-text absolute -left-3">{{ index + 1 }}</div>

      <div
        v-if="draggingIndex > index && dropIndex === index"
        class="absolute top-[-10px] left-[-16px] w-[224px] h-[1px] bg-primary"
      ></div>

      <div
        class="relative w-[192px] h-[108px] box-content border"
        :class="{
          [index === currentIndex ? 'border-primary' : 'border-secondary-border']: true,
          'opacity-30': index === draggingIndex,
        }"
        draggable="true"
        @dragstart="draggingIndex = index"
        @dragend="draggingIndex = -1"
        @dragover.prevent="onDragOver($event, index)"
        @drop="onDrop"
      >
        <div
          class="slide origin-top-left scale-[0.2] bg-white"
          :style="{ width: `${DEFAULT_SLIDE_WIDTH}px`, height: `${DEFAULT_SLIDE_HEIGHT}px` }"
        >
          <component
            class="origin-top-left scale-20 bg-white"
            v-for="block of slide.blocks"
            :key="block.id"
            :is="BlockViews[block.type]"
            :block="block"
          ></component>
        </div>
        <div class="absolute w-full h-full left-0 top-0 opacity-0"></div>
      </div>

      <div
        v-if="draggingIndex < index && dropIndex == index"
        class="absolute bottom-[-10px] left-[-16px] w-[224px] h-[1px] bg-primary"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide-list {
  &::-webkit-scrollbar {
    width: 15px;
    height: 15px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #f7f4ed;
  }
  &::-webkit-scrollbar-thumb {
    background: #c7c9cd;
    border-radius: 100vh;
    border: 3px solid #f6f7ed;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #858184;
  }
}
</style>
