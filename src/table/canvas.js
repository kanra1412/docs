
const canvas = document.getElementById('table');
const ctx = canvas.getContext('2d');

const rows = 250;
const cols = 250;
const cellSize = 30;
const gap = 10;

const width = rows * (cellSize + gap) + gap;

const selectedCell = { row: 0, col: 0 };

canvas.width = width;
canvas.height = width;

ctx.fillStyle = 'black';

// Draw the grid
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const cellX = x * (cellSize + gap) + gap;
    const cellY = y * (cellSize + gap) + gap;
    ctx.fillStyle = '#ddd';
    ctx.fillRect(cellX, cellY, cellSize, cellSize);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(cellX, cellY, cellSize, cellSize);
  }
}


function drawGrid() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw grid lines
  for (let x = 0; x <= width; x += cellSize + gap) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, width);
    ctx.stroke();
  }

  for (let y = 0; y <= width; y += cellSize + gap) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw cells
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;

      ctx.fillStyle = 'white'; // Default cell color
      if (row === selectedCell?.row && col === selectedCell?.col) {
        ctx.fillStyle = 'lightblue';
      }

      // ctx.fillRect(x, y, cellSize, cellSize);
    }
  }

  // Highlight row and column on mouse hover
  // if (hoveredRow !== null && hoveredCol !== null) {
  //   ctx.fillStyle = 'yellow'; // Highlight color
  //   ctx.fillRect(hoveredCol * cellSize, 0, cellSize, 1000); // Highlight column
  //   ctx.fillRect(0, hoveredRow * cellSize, 1000, cellSize); // Highlight row
  // }
}

// drawGrid();
