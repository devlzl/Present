<script setup lang="ts">
import { TextBoxModel } from '@Kernel/ElementModels/TextBoxModel'

const { model } = defineProps<{
  model: TextBoxModel
}>()

const { x, y, width, height } = model
</script>

<template>
  <input
    class="text-box"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
  />
</template>

<style scoped lang="scss">
.text-box {
  position: absolute;
  border: 1px dashed gray;
}
</style>
