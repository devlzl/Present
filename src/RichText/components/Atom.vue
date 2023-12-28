<script setup lang="ts">
import { type TextAtom } from '@Kernel/Store/TextStore'

const { atom } = defineProps<{
  atom: TextAtom
}>()
</script>

<template>
  <span
    class="atom"
    :class="{
      bold: atom.attributes.bold,
      italic: atom.attributes.italic,
      underline: atom.attributes.underline,
      strike: atom.attributes.strike,
    }"
    :style="{
      color: atom.attributes.color as string,
      background: atom.attributes.background as string,
      fontSize: `${atom.attributes.fontSize}px`
    }"
    >{{ atom.text }}</span
  >
</template>

<style scoped lang="scss">
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}
.underline {
  text-decoration: underline;
}
.strike {
  text-decoration: line-through;
}
</style>
