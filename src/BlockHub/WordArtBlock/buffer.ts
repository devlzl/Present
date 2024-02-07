// create buffer and bind data

type OriginPositions = Array<{ x: number; y: number }>

function fillPositionBuffer(gl: WebGLRenderingContext, originPositions: OriginPositions) {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const frontFacePositions = originPositions.map((position) => [position.x, position.y, 0.5]).flat()
  const backFacePositions = originPositions.map((position) => [position.x, position.y, -0.5]).flat()
  const zFacePairPositions = []
  for (let i = 0; i < frontFacePositions.length; i += 3) {
    zFacePairPositions.push(frontFacePositions[i])
    zFacePairPositions.push(frontFacePositions[i + 1])
    zFacePairPositions.push(frontFacePositions[i + 2])
    zFacePairPositions.push(backFacePositions[i])
    zFacePairPositions.push(backFacePositions[i + 1])
    zFacePairPositions.push(backFacePositions[i + 2])
  }
  const positions = [...frontFacePositions, ...backFacePositions, ...zFacePairPositions]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
  return positionBuffer
}

function fillColorBuffer(gl: WebGLRenderingContext, originPositions: OriginPositions) {
  const colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  const length = originPositions.length
  const color = []
  for (let i = 0; i < length; i++) {
    color.push(1, 1, 1)
  }
  for (let i = 0; i < length; i++) {
    color.push(0, 0, 0.3)
  }
  for (let i = 0; i < length * 2; i++) {
    color.push(0.8, 0.8, 0.8)
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW)
  return colorBuffer
}

export function fillBuffer(gl: WebGLRenderingContext, originPositions: OriginPositions) {
  return {
    position: fillPositionBuffer(gl, originPositions),
    color: fillColorBuffer(gl, originPositions),
  }
}
