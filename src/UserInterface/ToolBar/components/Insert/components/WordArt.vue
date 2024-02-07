<script setup lang="ts">
import { FontSizeTwo } from '@icon-park/vue-next'
import ButtonGroup from '../../ButtonGroup.vue'
import { slideManager } from '@Kernel/index'
import ToolButton from '../../ToolButton.vue'
import { WordArtBlock } from '@BlockHub/WordArtBlock/WordArtBlock'

const insertWordArt = () => {
  const block = new WordArtBlock(330, 320)
  slideManager.currentSlide.addBlock(block)
}
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.wordArt.title')">
    <ToolButton :clickHandler="insertWordArt">
      <template #icon>
        <FontSizeTwo class="mb-1 rotate-[20deg]" theme="outline" size="32" fill="#5890e0" :strokeWidth="10" />
      </template>
      <template #name>{{ $t('ToolBar.insert.wordArt.title') }}</template>
    </ToolButton>
  </ButtonGroup>
</template>
