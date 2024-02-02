<script setup lang="ts">
import { selectionManager, slideManager } from '@Kernel/index'
import ButtonGroup from '../../ButtonGroup.vue'
import ToolButton from '../../ToolButton.vue'
import FlyOut from './icons/Exit/FlyOut.vue'
import { Animation } from '@Kernel/Animation/Animation'
import { DEFAULT_SLIDE_WIDTH } from '@Const/slide'

const flyOut = () => {
  const blocks = selectionManager.selectedBlocks
  const slide = slideManager.currentSlide
  blocks.forEach((block) => {
    const animation = new Animation('Exit', 'Fly Out', block, 'x', block.x, DEFAULT_SLIDE_WIDTH, 1000, 0)
    slide.addAnimation(animation)
  })
  slide.previewAnimation()
}
</script>

<template>
  <ButtonGroup name="Exit">
    <div class="flex">
      <ToolButton :clickHandler="flyOut">
        <template #icon><FlyOut /></template>
        <template #name>Fly Out</template>
      </ToolButton>
    </div>
  </ButtonGroup>
</template>
