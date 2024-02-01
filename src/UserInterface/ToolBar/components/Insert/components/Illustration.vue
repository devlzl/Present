<script setup lang="ts">
import { PictureAlbum, Down, Outdoor, GameEmoji } from '@icon-park/vue-next'
import ButtonGroup from '../../ButtonGroup.vue'
import Shapes from '../../common/Shapes.vue'
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.insert.illustration.title')">
    <div class="flex">
      <Shapes />
      <!-- <button class="flex flex-col items-center justify-center py-0 -mt-4 menu-btn">
        <PictureAlbum theme="multi-color" size="32" :fill="['#333', '#83beec', '#FFF', '#43CCF8']" :strokeWidth="2" />
        <span class="mt-1 text-xs">{{ $t('ToolBar.insert.illustration.stockImages') }}</span>
      </button>
      <button class="flex flex-col items-center justify-center py-0 -mt-4 menu-btn">
        <Outdoor theme="multi-color" size="32" :fill="['#333', '#83beec', '#FFF', '#43CCF8']" :strokeWidth="2" />
        <span class="mt-1 text-xs">{{ $t('ToolBar.insert.illustration.icons') }}</span>
      </button>
      <button class="flex flex-col items-center justify-center py-0 menu-btn">
        <GameEmoji theme="multi-color" size="32" :fill="['#333', '#83beec', '#FFF', '#43CCF8']" :strokeWidth="2" />
        <span class="mt-1 text-xs">{{ $t('ToolBar.insert.illustration.smartArt') }}</span>
        <Down class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
      </button> -->
    </div>
  </ButtonGroup>
</template>
