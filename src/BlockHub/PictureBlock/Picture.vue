<script setup lang="ts">
import { pickFile } from '@Utils/pickFile'
import { type PictureBlock } from './PictureBlock'
import { ref } from 'vue'

const { block } = defineProps<{
  block: PictureBlock
}>()

const { x, y, width, height } = block

const url = ref('')
async function insertPicture() {
  const file = await pickFile('image/*')
  if (file) {
    url.value = URL.createObjectURL(file)
  }
}

const rotate = ref(block.rotate)
block.props.events.update.on(({ key, to }) => {
  if (key === 'rotate') {
    rotate.value = to as number
  }
})
</script>

<template>
  <div
    class="picture absolute"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="insertPicture">
      add picture
    </button>
    <input type="range" value="0" min="0" max="360" @input="(event) => (block.rotate = Number((event.target as HTMLInputElement).value))" />

    <img :src="url" :style="{ transform: `rotate(${rotate}deg)` }" />
  </div>
</template>
