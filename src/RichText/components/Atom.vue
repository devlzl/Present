<script setup lang="ts">
import { type TextAtom } from '@Kernel/Store/TextStore'
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '@Const/font'

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
      color: atom.attributes.color as string ?? DEFAULT_FONT_COLOR,
      background: atom.attributes.background as string,
      fontFamily: `${atom.attributes.fontFamily ?? DEFAULT_FONT_FAMILY}`,
      fontSize: `${atom.attributes.fontSize ?? DEFAULT_FONT_SIZE}px`
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
