<script setup lang="ts">
import { onMounted } from 'vue'
import Present from './UserInterface/Present/Present.vue'
import { loadFont } from '@Font/loadFont'

onMounted(() => {
  loadFont()
})
</script>

<template>
  <Present />
</template>

<style scoped></style>
