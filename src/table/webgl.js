// Constants
const canvasWidth = 10000;
const canvasHeight = 20000;
const cellSize = 20; // Cell size including spacing
const numCells = canvasWidth / cellSize;
const spacing = 8;

// Variables to track selected cell and drag state
let selectedCellX = null;
let selectedCellY = null;
let isDragging = false;

// Create the canvas and get the drawing context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cellPattern = createCellPattern(); // Create a pattern for selected cells

// Enable hardware acceleration if available
if (canvas.getContext('webgl')) {
  ctx = canvas.getContext('webgl');
} else if (canvas.getContext('experimental-webgl')) {
  ctx = canvas.getContext('experimental-webgl');
}

// Set canvas dimensions
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Create a 2D array to store cell states (true = selected)
let cellStates = [];
for (let i = 0; i < numCells; i++) {
  cellStates[i] = new Array(numCells).fill(false);
}

// Draw the initial grid
drawGrid();

// Event listeners for mouse events
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

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

// Function to draw the grid
function drawGrid() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw cell borders
  for (let i = 0; i < numCells; i++) {
    for (let j = 0; j < numCells; j++) {
      const x = i * cellSize + spacing;
      const y = j * cellSize + spacing;

      ctx.strokeStyle = '#0000FF'; // Blue border
      ctx.strokeRect(x, y, cellSize - spacing, cellSize - spacing);
    }
  }

  // Draw patterns for selected cells
  for (let i = 0; i < numCells; i++) {
    for (let j = 0; j < numCells; j++) {
      if (cellStates[i][j]) {
        const x = i * cellSize + spacing;
        const y = j * cellSize + spacing;

        ctx.fillStyle = cellPattern;
        ctx.fillRect(x, y, cellSize - spacing, cellSize - spacing);
      }
    }
  }
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
