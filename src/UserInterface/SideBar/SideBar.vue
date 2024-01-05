<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { AddOne} from '@icon-park/vue-next';
import { kernel } from '@Kernel/index';
import { BlockViews } from '@BlockHub/BlockHub';

let dragIndex = 0;
const currentAddBlockIndex = ref<number>(-1);
const currentSlideIndex = ref<number>(kernel.currentIndex);

const selectSlide = (id: number) => {
  const index = kernel.slides.findIndex((item) => item.id === id);
  if (index !== -1) {
    kernel.currentIndex = index;
    currentSlideIndex.value = index;
  }
};

const dragstart = (e: DragEvent, index: number) => {
  hideInsertBlock();
	e.stopPropagation();
	dragIndex = index;
  setTimeout(() => {
    (e.target as HTMLDivElement).classList.add('moveing');
  });
};
const dragenter = (e: Event, index: number) => {
	e.preventDefault();
	if (dragIndex !== index) {
		const source = kernel.slides[dragIndex];
		kernel.slides.splice(dragIndex, 1);
		kernel.slides.splice(index, 0, source);
		dragIndex = index;
	}
};
const dragover = (e: DragEvent) => {
	e.preventDefault();
  (e.dataTransfer as DataTransfer).dropEffect = 'move';
};
const dragend = (e: DragEvent) => {
	(e.target as HTMLDivElement).classList.remove('moveing');
};
const insertSlide = (index: number) => {
  kernel.insertSlide(index + 1);
};
const hideInsertBlock = () => {
  currentAddBlockIndex.value = -1;
};

onMounted(() => {
  document.addEventListener('click', hideInsertBlock);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', hideInsertBlock);
});
</script>

<template>
  <div
    class="scrollbar w-[270px] bg-secondary border-r-2 border-secondary-border flex flex-col justify-start overflow-x-hidden overflow-y-auto"
  >
    <TransitionGroup name="list" tag="div">
      <div
        class="w-[216px] h-[123px] relative ml-8 cursor-pointer"
        v-for="(slide, index) of kernel.slides"
        :key="slide.id"
        @click="selectSlide(slide.id)"
        draggable="true"
        @dragstart="dragstart($event, index)"
        @dragenter="dragenter($event, index)"
        @dragend="dragend"
        @dragover="dragover"
      >
        <div class="absolute ml-3 text-lg -left-7">{{ index + 1 }}</div>
        <div
          class="box-border w-full h-full mt-4 border-4 border-gray-50 hover:border-gray-300"
          :class="currentSlideIndex === index ? 'border-4 !border-orange-400' : ''"
        >
          <div class="absolute z-10 w-full h-full opacity-0"></div>
          <div class="sliderbar-wrap w-[960px] h-[540px] border border-gray-600">
            <component v-for="block of slide.blocks" :is="BlockViews[block.type]" :block="block"></component>
          </div>
        </div>
        <div class="absolute flex items-center w-full h-4 -bottom-4" @click.stop="currentAddBlockIndex = index">
          <div v-show="currentAddBlockIndex === index" class="w-full h-0 border-2 border-amber-500"></div>
          <div v-show="currentAddBlockIndex === index" @click="insertSlide(index)">
            <AddOne theme="filled" size="18" fill="#f59e0b" :strokeWidth="5"/>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .sliderbar-wrap {
    transform: scale(0.22);
    transform-origin: top left;
  }

  .moveing {
    opacity: 0.3;
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.2s ease;
  }

  .scrollbar::-webkit-scrollbar {
    width: 15px;
    height: 15px;
  }

.scrollbar::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #f7f4ed;
}

.scrollbar::-webkit-scrollbar-thumb {
    background: #c7c9cd;
    border-radius: 100vh;
    border: 3px solid #f6f7ed;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
    background: #858184;
}
</style>
