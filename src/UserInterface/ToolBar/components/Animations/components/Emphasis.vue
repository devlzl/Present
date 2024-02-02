<script setup lang="ts">
import ButtonGroup from '../../ButtonGroup.vue'
import ToolButton from '../../ToolButton.vue'
import Spin from './icons/Emphasis/Spin.vue'
import { selectionManager, slideManager } from '@Kernel/index'
import { Animation } from '@Kernel/Animation/Animation'

const spin = () => {
  const blocks = selectionManager.selectedBlocks
  const slide = slideManager.currentSlide
  blocks.forEach((block) => {
    const animation = new Animation('Emphasis', 'Spin', block, 'rotate', block.rotate, block.rotate + 360, 1000, 0)
    slide.addAnimation(animation)
  })
  slide.previewAnimation()
}
</script>

<template>
  <ButtonGroup name="Emphasis">
    <div class="flex">
      <ToolButton :clickHandler="spin">
        <template #icon><Spin /></template>
        <template #name>Spin</template>
      </ToolButton>
    </div>
  </ButtonGroup>
</template>
