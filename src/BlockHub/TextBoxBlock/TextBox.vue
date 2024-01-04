<script setup lang="ts">
import { type AttributeValue } from '@Kernel/Store/TextStore'
import { type TextBoxBlock } from './TextBoxBlock'
import RichText from '@RichText/RichText.vue'
import { ref } from 'vue'

const { block } = defineProps<{
  block: TextBoxBlock
}>()

const { x, y, textStore, bindController } = block

function formatBlock(name: string, value: AttributeValue) {
  block.formatBlock(name, value)
}

function format(name: string, value: AttributeValue) {
  block.getController().format(name, value)
}

const width = ref(block.width)
const height = ref(block.height)
block.props.events.update.on(({ key, to }) => {
  if (key === 'width') {
    width.value = to as number
  } else if (key === 'height') {
    height.value = to as number
  }
})
</script>

<template>
  <div
    class="text-box absolute border border-dashed border-secondary-border"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <button
      class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2"
      @click="formatBlock('bold', true)"
    >
      bold block
    </button>
    <button
      class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2"
      @click="formatBlock('italic', true)"
    >
      italic block
    </button>
    <button
      class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2"
      @click="formatBlock('underline', true)"
    >
      underline block
    </button>
    <button
      class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2"
      @click="formatBlock('strike', true)"
    >
      strike block
    </button>
    <br />
    <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="format('bold', true)">
      bold
    </button>
    <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="format('italic', true)">
      italic
    </button>
    <button
      class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2"
      @click="format('underline', true)"
    >
      underline
    </button>
    <button class="border border-primary rounded-sm text-primary bg-white hover:bg-primary hover:text-white m-2 px-2" @click="format('strike', true)">
      strike
    </button>
    <select @change="(event) => format('fontSize', (event.target as HTMLSelectElement).value)">
      <option v-for="option in [14, 20, 30, 50, 100]" :value="option">
        {{ option }}
      </option>
    </select>
    <input type="color" @input="(event) => format('color', (event.target as HTMLInputElement).value)" />
    <input type="color" @input="(event) => format('background', (event.target as HTMLInputElement).value)" />

    <br />
    width
    <input type="range" value="500" min="0" max="1000" @input="(event) => (block.width = Number((event.target as HTMLInputElement).value))" /><br />
    height
    <input type="range" value="200" min="0" max="400" @input="(event) => (block.height = Number((event.target as HTMLInputElement).value))" /><br />

    <RichText :textStore="textStore" :bindController="bindController" />
  </div>
</template>
