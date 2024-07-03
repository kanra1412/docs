// Constants
const canvasWidth = 20000;
const canvasHeight = 1000;
const cellSize = 20; // Cell size including spacing
const spacing = 8;
const numCells = canvasWidth / cellSize;

// Variables to track selected cell and drag state
let selectedCellX = null;
let selectedCellY = null;
let isDragging = false;

// Create the canvas and get the WebGL context
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl'); // Enables WebGL hardware acceleration

// If WebGL is not supported, fall back to 2D canvas
if (!gl) {
  console.error('WebGL is not supported. Falling back to 2D canvas.');
  ctx = canvas.getContext('2d');
  drawGrid(); // Draw the grid using 2D canvas
  // return;
}
// const cellPattern = createCellPattern(); // Create a pattern for selected cells

// Set canvas dimensions
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Create a 2D array to store cell states (true = selected)
let cellStates = [];
for (let i = 0; i < numCells; i++) {
  cellStates[i] = new Array(numCells).fill(false);
}

// Function to create a pattern for selected cells
function createCellPattern() {
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = cellSize;
  patternCanvas.height = cellSize;
  const patternCtx = patternCanvas.getContext('2d');

  patternCtx.fillStyle = '#00FF00'; // Green fill
  patternCtx.fillRect(0, 0, cellSize, cellSize);

  patternCtx.lineWidth = 2;
  patternCtx.strokeStyle = '#0000FF'; // Blue border
  patternCtx.strokeRect(0, 0, cellSize, cellSize);

  return ctx.createPattern(patternCanvas, 'repeat');
}

// Initialize WebGL buffers and shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
  precision highp float;

  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`);

const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
  precision highp float;

  uniform sampler2D uPattern;
  varying vec2 vTexCoord;

  void main() {
    vec4 color = texture2D(uPattern, vTexCoord);
    if (color.a == 0.0) {
      discard; // Discard transparent pixels
    } else {
      gl_FragColor = color;
    }
  }
`);

const shaderProgram = createProgram(gl, vertexShader, fragmentShader);

// Create vertex buffer object (VBO) for cell positions
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positionData = new Float32Array(numCells * numCells * 2); // 2 values per vertex (x, y)
let vertexIndex = 0;
for (let i = 0; i < numCells; i++) {
  for (let j = 0; j < numCells; j++) {
    const x = i * cellSize + spacing;
    const y = j * cellSize + spacing;

    positionData[vertexIndex++] = x / canvasWidth; // Normalize coordinates to [0, 1]
    positionData[vertexIndex++] = y / canvasHeight;
  }
}

gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);

// Create texture for cell pattern
const patternTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, patternTexture);

// Load cell pattern image into the texture
const patternImage = new Image();
patternImage.onload = () => {
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, patternImage);

  // Set texture parameters for filtering and wrapping
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

  drawGrid(); // Draw the grid using WebGL
};
patternImage.src = 'cellPattern.png'; // Replace with the actual path to your pattern image

// Function to create a shader
// Function to create a shader
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// Function to create a shader program
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Error linking program:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

// Function to draw the grid
function drawGrid() {
  gl.viewport(0, 0, canvasWidth, canvasHeight);

  // Clear the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Use the shader program
  gl.useProgram(shaderProgram);

  // Get attribute locations
  const positionLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
  const textureLocation = gl.getUniformLocation(shaderProgram, 'uPattern');

  // Bind the vertex buffer object (VBO)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Enable the vertex attribute
  gl.enableVertexAttribArray(positionLocation);

  // Define the vertex attribute format
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Bind the texture
  gl.bindTexture(gl.TEXTURE_2D, patternTexture);

  // Set the texture uniform
  gl.uniform1i(textureLocation, 0); // Texture unit 0

  // Draw the cells
  gl.drawArrays(gl.POINTS, 0, numCells * numCells);
}

// Function to handle mouse down event
function handleMouseDown(event) {
  const cellX = Math.floor((event.offsetX + spacing) / cellSize);
  const cellY = Math.floor((event.offsetY + spacing) / cellSize);

  if (cellX >= 0 && cellX < numCells && cellY >= 0 && cellY < numCells) {
    selectedCellX = cellX;
    selectedCellY = cellY;
    isDragging = true;
  }
}

// Function to handle mouse move event (for dragging selection)
function handleMouseMove(event) {
  if (isDragging) {
    const cellX = Math.floor((event.offsetX + spacing) / cellSize);
    const cellY = Math.floor((event.offsetY + spacing) / cellSize);

    if (cellX >= 0 && cellX < numCells && cellY >= 0 && cellY < numCells) {
      cellStates[selectedCellX][selectedCellY] = false;
      cellStates[cellX][cellY] = true;
      drawGrid();

      selectedCellX = cellX;
      selectedCellY = cellY;
    }
  }
}

// Function to handle mouse up event
function handleMouseUp(event) {
  isDragging = false;
}

// Event listeners for mouse events
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
