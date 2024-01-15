<script setup lang="ts">
import { Down } from '@icon-park/vue-next'

const { clickHandler } = defineProps<{
  clickHandler?: (event: MouseEvent) => void
  disabled?: boolean
  hasMenu?: boolean
}>()
</script>

<template>
  <div class="tool-button">
    <button class="menu-btn flex flex-col items-center" @click="clickHandler" :disabled="disabled">
      <slot name="icon"></slot>
      <span class="text-xs">
        <slot name="name"></slot>
      </span>
      <Down v-if="hasMenu" class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
    </button>

    <slot name="menu"></slot>
  </div>
</template>
