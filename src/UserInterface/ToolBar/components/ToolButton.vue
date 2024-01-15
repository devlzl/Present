<script setup lang="ts">
import { Down } from '@icon-park/vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  clickHandler?: (event: MouseEvent) => void
  disabled?: boolean
  hasMenu?: boolean
}>()

const showMenu = ref(false)
const onClick = (event: MouseEvent) => {
  if (props.hasMenu) {
    showMenu.value = !showMenu.value
  } else {
    props.clickHandler?.(event)
  }
}

const hideMenu = () => {
  showMenu.value = false
}
onMounted(() => {
  document.addEventListener('click', hideMenu)
})
onUnmounted(() => {
  document.removeEventListener('click', hideMenu)
})
</script>

<template>
  <div class="tool-button relative">
    <button class="menu-btn flex items-center" @click.stop="onClick" :disabled="disabled">
      <div class="flex flex-col">
        <slot name="icon"></slot>
        <span class="text-xs">
          <slot name="name"></slot>
        </span>
      </div>
      <Down v-if="hasMenu" class="-mt-1" theme="outline" size="17" fill="#333" :strokeWidth="2" />
    </button>
    <div v-if="showMenu" class="absolute left-0 top-[90px] min-w-[50px] min-h-[50px] bg-white shadow-lg border z-[1]">
      <slot name="menu"></slot>
    </div>
  </div>
</template>
