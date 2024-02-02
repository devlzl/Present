<script setup lang="ts">
import { slideManager } from '@Kernel/index'
import { triggerRef } from 'vue'
import { shallowRef } from 'vue'
import { Delete } from '@icon-park/vue-next'

const slide = shallowRef(slideManager.currentSlide)
const animations = shallowRef(slide.value.animations)

const updateAnimations = () => {
  slide.value.events.animationChange.on(() => {
    animations.value = slide.value.animations
    triggerRef(animations)
  })
}

slideManager.events.update.on(() => {
  slide.value = slideManager.currentSlide
  updateAnimations()
})
updateAnimations()
</script>

<template>
  <div
    class="w-[250px] flex-none flex flex-col gap-[6px] items-center border-l border-secondary-border bg-secondary"
    v-if="animations.size"
  >
    <div class="text-base pt-[10px] pb-[6px]">Animation</div>
    <div v-for="animation of animations" class="flex flex-col gap-[2px] w-[220px] p-[10px] shadow bg-white">
      <div class="flex justify-between items-center">
        <span
          :style="{
            color: {
              Entrance: '#309048FF',
              Emphasis: '#DE6C00FF',
              Exit: '#ED3D3BFF',
            }[animation.type],
          }"
          >{{ animation.type }}: {{ animation.name }}</span
        >
        <Delete
          theme="outline"
          size="24"
          fill="#333"
          :strokeWidth="2"
          class="menu-btn"
          @click="slide.deleteAnimation(animation)"
        />
      </div>
      <div class="flex justify-between">
        <span>Duration:</span><input type="number" class="border w-[90px]" v-model="animation.duration" />
      </div>
      <div class="flex justify-between">
        <span>Delay:</span><input type="number" class="border w-[90px]" v-model="animation.delay" />
      </div>
    </div>
  </div>
</template>
