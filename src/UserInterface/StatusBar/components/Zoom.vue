<script setup lang="ts">
import { zoom } from '@Kernel/index'
import { ref } from 'vue'

const zoomValue = ref()
zoom.updateEvent.on((value) => {
  zoomValue.value = (value * 100).toFixed()
})

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  zoom.update(Number(value) / 100, true)
}
</script>

<template>
  <div class="zoom flex items-center gap-[10px] mr-[10px]">
    <input type="range" @input="onInput" min1="10" max="200" :value="zoomValue" />
    <div class="w-[36px]">{{ zoomValue }}%</div>
  </div>
</template>
