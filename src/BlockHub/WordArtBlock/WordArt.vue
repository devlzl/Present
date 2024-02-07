<script setup lang="ts">
import { BasicPropName } from '@BlockHub/Block/Block'
import { type WordArtBlock } from './WordArtBlock'
import { onMounted, ref, nextTick } from 'vue'
import { initShader } from './shader'
import { fillBuffer } from './buffer'
import { textToPositions } from './textToPositions'
import { WORD_ART_LETTER_WIDTH } from '@Const/block'

const { block } = defineProps<{
  block: WordArtBlock
}>()

const inputRef = ref<HTMLInputElement | null>()
const editing = ref(false)
const edit = async () => {
  if (editing.value) {
    return
  }
  editing.value = true
  await nextTick()
  const input = inputRef.value as HTMLInputElement
  input.value = block.text
  input.focus()
}
const save = (event: Event) => {
  editing.value = false
  const text = (event.target as HTMLInputElement).value
  block.text = text
  block.width = text.length * WORD_ART_LETTER_WIDTH
}

const { x, y, width, height, rotate } = block
const props = ref({ x, y, width, height, rotate })
block.props.events.update.on(({ key, to }) => {
  const value = to as number
  const rectKey = key as BasicPropName
  if (['x', 'y', 'width', 'height', 'rotate'].includes(rectKey)) {
    props.value[rectKey] = value
  } else if (key === 'text') {
    update(to as string)
  }
})

const canvasRef = ref<HTMLCanvasElement | null>()
const update = async (text: string) => {
  await nextTick() // wait for canvas v-if mounted
  const gl = (canvasRef.value as HTMLCanvasElement).getContext('webgl') as WebGLRenderingContext
  const originPositions = textToPositions(text)
  const shader = initShader(gl)
  const buffer = fillBuffer(gl, originPositions)

  gl.enableVertexAttribArray(shader.position)
  gl.enableVertexAttribArray(shader.color)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position)
  gl.vertexAttribPointer(shader.position, 3, gl.FLOAT, false, 0, 0)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.color)
  gl.vertexAttribPointer(shader.color, 3, gl.FLOAT, false, 0, 0)

  gl.enable(gl.DEPTH_TEST)
  gl.drawArrays(gl.POINTS, 0, originPositions.length)
  gl.drawArrays(gl.POINTS, originPositions.length, originPositions.length)
  gl.drawArrays(gl.LINES, originPositions.length * 2, originPositions.length * 2)
}

onMounted(() => {
  update(block.text)
})
</script>

<template>
  <div class="word-art" @dblclick="edit">
    <input
      v-if="editing"
      ref="inputRef"
      :style="{ fontSize: `75px`, width: '100%', height: '100%', padding: '4px' }"
      @blur="save($event)"
      @keydown="(event) => event.key === 'Enter' && save(event)"
    />
    <canvas v-else ref="canvasRef" :style="{ width: '100%', height: '100%' }"></canvas>
  </div>
</template>
