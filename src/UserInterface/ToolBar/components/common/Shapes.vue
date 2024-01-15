<script setup lang="ts">
import { toolBox } from '@Kernel/index'
import ToolButton from '../ToolButton.vue'
import { GraphicDesign, Square, Triangle, Round, Star, HexagonOne } from '@icon-park/vue-next'
</script>
<template>
  <ToolButton :hasMenu="true">
    <template #icon>
      <GraphicDesign theme="two-tone" size="32" :fill="['#333', '#83BEEC']" :strokeWidth="1" />
    </template>
    <template #name>{{ $t('ToolBar.insert.illustration.shapes') }}</template>
    <template #menu>
      <div class="p-[10px] flex flex-wrap items-center gap-[10px] w-[172px]">
        <Square
          class="menu-btn cursor-pointer"
          theme="filled"
          size="36"
          fill="#4d4d4d"
          :strokeWidth="2"
          @click="toolBox.changeTool('Shape', { shape: 'rect' })"
        />
        <Triangle
          class="menu-btn cursor-pointer"
          theme="filled"
          size="36"
          fill="#4d4d4d"
          :strokeWidth="2"
          @click="toolBox.changeTool('Shape', { shape: 'triangle' })"
        />
        <Round
          class="menu-btn cursor-pointer"
          theme="filled"
          size="36"
          fill="#4d4d4d"
          :strokeWidth="2"
          @click="toolBox.changeTool('Shape', { shape: 'circle' })"
        />
        <Star
          class="menu-btn cursor-pointer"
          theme="filled"
          size="36"
          fill="#4d4d4d"
          :strokeWidth="2"
          @click="toolBox.changeTool('Shape', { shape: 'star' })"
        />
        <HexagonOne
          class="menu-btn cursor-pointer"
          theme="filled"
          size="36"
          fill="#4d4d4d"
          :strokeWidth="2"
          @click="toolBox.changeTool('Shape', { shape: 'hexagon' })"
        />
      </div>
    </template>
  </ToolButton>
</template>
