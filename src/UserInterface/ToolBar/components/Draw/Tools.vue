<script setup lang="ts">
import { Pencil } from '@icon-park/vue-next'
import MenuWrapper from '../MenuWrapper.vue'
import { toolBox } from '@Kernel/index'
</script>

<template>
  <MenuWrapper :name="$t('ToolBar.draw.tools.title')">
    <button class="menu-btn flex flex-col items-center" @click="toolBox.events.toolChange.emit('Pen')">
      <Pencil theme="outline" size="32" fill="#333" :strokeWidth="2" />
      <span class="text-xs mt-1">{{ $t('ToolBar.draw.tools.pen') }}</span>
    </button>
  </MenuWrapper>
</template>
