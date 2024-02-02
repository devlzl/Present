<script setup lang="ts">
import ButtonGroup from '../../ButtonGroup.vue'
import ToolButton from '../../ToolButton.vue'
import FlyIn from './icons/Entrance/FlyIn.vue'
import { selectionManager, slideManager } from '@Kernel/index'
import { Animation } from '@Kernel/Animation/Animation'
import { DEFAULT_SLIDE_HEIGHT } from '@Const/slide'

const flyIn = () => {
  const blocks = selectionManager.selectedBlocks
  const slide = slideManager.currentSlide
  blocks.forEach((block) => {
    const animation = new Animation('Entrance', 'Fly In', block, 'y', DEFAULT_SLIDE_HEIGHT, block.y, 2000, 0)
    slide.addAnimation(animation)
  })
  slide.previewAnimation()
}
</script>

<template>
  <ButtonGroup name="Entrance">
    <div class="flex">
      <ToolButton :clickHandler="flyIn">
        <template #icon><FlyIn /></template>
        <template #name>Fly In</template>
      </ToolButton>
    </div>
  </ButtonGroup>
</template>
