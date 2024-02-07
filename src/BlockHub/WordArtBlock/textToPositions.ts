import { WORD_ART_LETTER_WIDTH, WORD_ART_LETTER_HEIGHT, WORD_ART_FONT_SIZE } from '@Const/block'

export function textToPositions(text: string) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = WORD_ART_LETTER_WIDTH * text.length
  canvas.height = WORD_ART_LETTER_HEIGHT
  context.font = `${WORD_ART_FONT_SIZE}px WordArt`
  context.textBaseline = 'top'
  context.fillText(text, 0, 0)
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

  let maxX = 0
  let maxY = 0
  const glyphs = []
  for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
      // 4 bytes for each pixel
      const index = (imageData.width * y + x) * 4
      // 0R / 1G / 2B / 3A
      const alpha = imageData.data[index + 3]
      if (alpha > 0) {
        glyphs.push({ x, y })
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }
    }
  }

  return glyphs.map((glyph) => {
    let x = glyph.x / maxX
    let y = glyph.y / maxY
    return {
      x: 2 * x - 1,
      y: -2 * y + 1,
    }
  })
}
