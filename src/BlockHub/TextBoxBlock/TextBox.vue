<script setup lang="ts">
import { type TextBoxBlock } from './TextBoxBlock'
import RichText from '@RichText/RichText.vue'

const { block } = defineProps<{
  block: TextBoxBlock
}>()

const { x, y, width, height, textStore, bindController } = block

function format(name: string, value: any) {
  block.controller?.format(name, value)
}
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

    <RichText :textStore="textStore" :bindController="bindController" />
  </div>
</template>
