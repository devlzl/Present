<script setup lang="ts">
import { Down, SpeakerOne, Video } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.media.title')">
    <div class="flex">
      <button class="flex flex-col items-center justify-center -mt-4 menu-btn">
        <SpeakerOne theme="outline" size="32" fill="#333" :strokeWidth="2" />
        <span class="mt-1 text-xs">{{ $t('ToolBar.insert.media.audio') }}</span>
      </button>
      <button class="flex flex-col items-center justify-center py-0 menu-btn">
        <Video theme="outline" size="32" fill="#333" :strokeWidth="2" />
        <span class="mt-1 text-xs">{{ $t('ToolBar.insert.media.video') }}</span>
        <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
      </button>
    </div>
  </ButtonGroup>
</template>
