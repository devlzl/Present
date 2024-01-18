<script setup lang="ts">
import type { BasicPropName, Block } from '@BlockHub/Block/Block'
import { BlockViews } from '@BlockHub/BlockHub'
import { selectionManager } from '@Kernel/index'
import { OneThirdRotation } from '@icon-park/vue-next'
import { computed, ref } from 'vue'

const { block, inSlideContainer } = defineProps<{
  block: Block
  inSlideContainer: boolean
}>()

const { x, y, width, height, rotate } = block
const props = ref({ x, y, width, height, rotate })
block.props.events.update.on(({ key, to }) => {
  if (['x', 'y', 'width', 'height', 'rotate'].includes(key)) {
    const name = key as BasicPropName
    props.value[name] = to as number
  }
})

const selected = ref(selectionManager.isSelected(block))
const showSelectHandle = computed(() => {
  return selected.value && inSlideContainer
})
selectionManager.events.update.on(() => {
  selected.value = selectionManager.isSelected(block)
})
</script>

<template>
  <div
    class="selectable-block absolute"
    :data-block-id="block.id"
    :style="{
      left: `${props.x}px`,
      top: `${props.y}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
      rotate: `${props.rotate}deg`,
    }"
  >
    <component :is="BlockViews[block.type]" :block="block" :style="{ width: '100%', height: '100%' }"></component>

    <OneThirdRotation
      v-if="showSelectHandle"
      class="rotate-handle"
      :style="{ top: '-40px', left: `${props.width / 2 - 12}px` }"
      theme="outline"
      size="24"
      fill="#333"
      :strokeWidth="2"
    />

    <div v-if="showSelectHandle" class="move-handle" :style="{ top: '-6px', left: '0', width: '100%', height: '12px' }">
      <div class="absolute w-full h-[2px] top-[5px] bg-[gray]"></div>
    </div>
    <div
      v-if="showSelectHandle"
      class="move-handle"
      :style="{ bottom: '-6px', left: '0', width: '100%', height: '12px' }"
    >
      <div class="absolute w-full h-[2px] bottom-[5px] bg-[gray]"></div>
    </div>
    <div v-if="showSelectHandle" class="move-handle" :style="{ top: '0', left: '-6px', width: '12px', height: '100%' }">
      <div class="absolute h-full w-[2px] left-[5px] bg-[gray]"></div>
    </div>
    <div
      v-if="showSelectHandle"
      class="move-handle"
      :style="{ top: '0', right: '-6px', width: '12px', height: '100%' }"
    >
      <div class="absolute h-full w-[2px] right-[5px] bg-[gray]"></div>
    </div>

    <div
      v-if="showSelectHandle"
      class="size-handle top cursor-ns-resize"
      :style="{ top: '-6px', left: `${props.width / 2 - 6}px` }"
    ></div>
    <div
      v-if="showSelectHandle"
      class="size-handle bottom cursor-ns-resize"
      :style="{ bottom: '-6px', left: `${props.width / 2 - 6}px` }"
    ></div>
    <div
      v-if="showSelectHandle"
      class="size-handle left cursor-ew-resize"
      :style="{ top: `${props.height / 2 - 6}px`, left: '-6px' }"
    ></div>
    <div
      v-if="showSelectHandle"
      class="size-handle right cursor-ew-resize"
      :style="{ top: `${props.height / 2 - 6}px`, right: '-6px' }"
    ></div>

    <div
      v-if="showSelectHandle"
      class="size-handle top left cursor-nwse-resize"
      :style="{ top: '-6px', left: '-6px' }"
    ></div>
    <div
      v-if="showSelectHandle"
      class="size-handle top right cursor-nesw-resize"
      :style="{ top: '-6px', right: '-6px' }"
    ></div>
    <div
      v-if="showSelectHandle"
      class="size-handle bottom left cursor-nesw-resize"
      :style="{ bottom: '-6px', left: '-6px' }"
    ></div>
    <div
      v-if="showSelectHandle"
      class="size-handle bottom right cursor-nwse-resize"
      :style="{ bottom: '-6px', right: '-6px' }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.rotate-handle {
  position: absolute;
  cursor: grab;
}

.move-handle {
  position: absolute;
  z-index: 1;
  cursor: move;
}

.size-handle {
  position: absolute;
  z-index: 1;
  width: 12px;
  height: 12px;
  background-color: white;
  border: 2px solid gray;
  border-radius: 50%;
}
</style>
