<script setup lang="ts">
import { Notepad, CuttingOne, CopyOne, Format } from '@icon-park/vue-next'
import ButtonGroup from '../ButtonGroup.vue'
import ToolButton from '../ToolButton.vue'
import { richTextObserver, selectionManager } from '@Kernel/index'
import { ref, shallowRef, computed } from 'vue'

const selectedText = ref('')
richTextObserver.on(() => {
  selectedText.value = window.getSelection()?.toString() as string
})

const copy = async () => {
  const type = 'text/plain'
  const blob = new Blob([selectedText.value], { type })
  const data = [new ClipboardItem({ [type]: blob })]
  await navigator.clipboard.write(data)
}

const cut = () => {
  copy()
  const currentBlock = selectionManager.selectedBlocks[0]
  currentBlock.getController().delete()
}

const selectedBlocks = shallowRef(selectionManager.selectedBlocks)
selectionManager.events.update.on(() => {
  selectedBlocks.value = selectionManager.selectedBlocks
})
const canPaste = computed(() => {
  return selectedBlocks.value.length === 1 && selectedBlocks.value[0].type === 'TextBox'
})
const paste = async () => {
  const text = await navigator.clipboard.readText()
  const currentBlock = selectionManager.selectedBlocks[0]
  currentBlock.getController().insert(text)
}
</script>

<template>
  <ButtonGroup :name="$t('ToolBar.home.clipboard.title')">
    <div class="flex">
      <ToolButton :disabled="!canPaste" :clickHandler="paste">
        <template #icon>
          <Notepad theme="two-tone" size="32" :fill="['#C43E1C', '#FFF']" :strokeWidth="2" />
        </template>
        <template #name>{{ $t('ToolBar.home.clipboard.paste') }}</template>
      </ToolButton>

      <div class="flex flex-col justify-center">
        <button class="menu-btn py-0 pb-[2px] text-left" @click="cut" :disabled="selectedText.length === 0">
          <CuttingOne theme="two-tone" size="18" :fill="['#333', '#83BEEC']" :strokeWidth="2" />
          <span class="text-xs ml-1 align-middle">{{ $t('ToolBar.home.clipboard.cut') }}</span>
        </button>
        <button class="menu-btn py-0 pb-[2px] text-left" @click="copy" :disabled="selectedText.length === 0">
          <CopyOne theme="two-tone" size="18" :fill="['#333', '#FFF']" :strokeWidth="2" />
          <span class="text-xs ml-1">{{ $t('ToolBar.home.clipboard.copy') }}</span>
        </button>
        <!-- <button class="menu-btn py-0 pb-[2px] text-left">
          <format theme="two-tone" size="18" :fill="['#333', '#DE6C00']" :strokeWidth="2" />
          <span class="text-xs ml-1">{{ $t('ToolBar.home.clipboard.format') }}</span>
        </button> -->
      </div>
    </div>
  </ButtonGroup>
</template>
