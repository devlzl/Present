import fontSource from './RobotoMono-Bold.ttf'

export async function loadFont() {
  const response = await fetch(fontSource)
  const fontData = await response.arrayBuffer()
  const font = new FontFace('WordArt', fontData)
  document.fonts.add(font)
}
