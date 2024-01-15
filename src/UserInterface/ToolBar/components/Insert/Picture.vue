<script setup lang="ts">
import { Pic } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import { pickFile } from '@Utils/pickFile'
import { PictureBlock } from '@BlockHub/PictureBlock/PictureBlock'
import { slideManager } from '@Kernel/index'
import ToolButton from '../ToolButton.vue'

async function insertPicture() {
  const block = new PictureBlock(200, 200)
  const file = await pickFile('image/*')
  if (file) {
    block.url = URL.createObjectURL(file)
  }
  slideManager.currentSlide.addBlock(block)
}
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.picture.title')">
    <ToolButton :clickHandler="insertPicture">
      <template #icon>
        <Pic
          class="mb-1"
          theme="multi-color"
          size="32"
          :fill="['#333', '#83beec', '#FFF', '#43CCF8']"
          :strokeWidth="2"
        />
      </template>
      <template #name>{{ $t('ToolBar.insert.picture.btnName') }}</template>
    </ToolButton>
  </ButtonGroup>
</template>
