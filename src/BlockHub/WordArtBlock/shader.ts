const vertexShaderSource = /*glsl*/ `
  attribute vec4 position;
  attribute vec4 color;
  varying vec4 vColor;

  void main() {
    float radianX = radians(-20.0);
    float sinX = sin(radianX);
    float cosX = cos(radianX);
    mat4 mx = mat4(1,0,0,0, 0,cosX,-sinX,0, 0,sinX,cosX,0, 0,0,0,1);

    float radianY = radians(6.0);
    float sinY = sin(radianY);
    float cosY = cos(radianY);
    mat4 my = mat4(cosY,0,-sinY,0, 0,1,0,0, sinY,0,cosY,0, 0,0,0,1);

    gl_PointSize = 1.0;
    gl_Position = mx * my * position;
    vColor = color;
  }
`

const fragmentShaderSource = /*glsl*/ `
  precision highp float;
  varying vec4 vColor;

  void main() {
      gl_FragColor = vColor;
  }
`

// create and compile shader
function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type) as WebGLShader
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(`Error compiling: ${gl.getShaderInfoLog(shader)}`)
    gl.deleteShader(shader)
    return null
  }
  return shader
}

// initialize a shader program and attach shaders
function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource) as WebGLShader
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource) as WebGLShader
  const shaderProgram = gl.createProgram() as WebGLProgram
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log(`Error initializing program: ${gl.getProgramInfoLog(shaderProgram)}`)
    return null
  }
  gl.useProgram(shaderProgram)
  return shaderProgram
}

export function initShader(gl: WebGLRenderingContext) {
  const shaderProgram = createProgram(gl, vertexShaderSource, fragmentShaderSource) as WebGLProgram
  return {
    position: gl.getAttribLocation(shaderProgram, 'position'),
    color: gl.getAttribLocation(shaderProgram, 'color'),
  }
}
