<script setup lang="ts">
import LocaleChanger from './components/LocaleChanger.vue'
import Zoom from './components/Zoom.vue'
</script>

<template>
  <div class="flex justify-between h-[24px] bg-secondary border-t border-secondary-hover">
    <LocaleChanger />
    <Zoom />
  </div>
</template>
