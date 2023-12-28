<script setup lang="ts">
import { TextAtom } from '@Kernel/Store/TextStore'
import Atom from './Atom.vue'

const { atoms } = defineProps<{
  atoms: Array<TextAtom>
}>()
</script>

<template>
  <div class="row min-h-[14px]">
    <Atom v-for="atom of atoms" :atom="atom" />
  </div>
</template>
