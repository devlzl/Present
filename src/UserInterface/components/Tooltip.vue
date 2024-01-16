<script setup lang="ts">
import { ref } from 'vue'

const { text } = defineProps<{
  text: string
}>()

const showTooltip = ref(false)
</script>

<template>
  <div class="relative" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
    <slot></slot>
    <div
      v-if="showTooltip"
      class="absolute bottom-[-24px] bg-secondary border px-[3px] rounded-[2px]"
      :style="{ textWrap: 'nowrap' }"
    >
      {{ text }}
    </div>
  </div>
</template>
