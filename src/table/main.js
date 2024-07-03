// import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// @Component({
//    name: 'my-component',
//    // notice the variable name myCanvas
//    template: `<canvas #myCanvas></canvas>`
// changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class myComponent implements AfterViewInit {
//   // its important myCanvas matches the variable name in the template
//   @ViewChild('myCanvas')
//   canvas: ElementRef<HTMLCanvasElement>;

//   context: CanvasRenderingContext2D;

//   ngAfterViewInit(): void {
//     this.context = this.canvas.nativeElement.getContext('2d');
//   }
// }
// 使用 OnPush 更改检测策略来指示 Angular 仅在组件的输入发生更改时对其进行检测。
// 使用 NgZone 将 Canvas 操作移出 Angular 的更改检测循环。
// 手动触发 Canvas 的重新绘制。
// this.ngZone.runOutsideAngular(() => {});


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let selectedCell = null; // Track the currently selected cell
let isDragging = false; // Track whether the mouse is dragging
let dragStartCell = null; // Store the starting cell of a drag

const cellSize = 10; // Size of each cell
const numRows = 1000 / cellSize; // Number of rows
const numCols = 1000 / cellSize; // Number of columns

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines
  for (let x = 0; x <= 1000; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1000);
    ctx.stroke();
  }

  for (let y = 0; y <= 1000; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1000, y);
    ctx.stroke();
  }

  // Draw cells
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * cellSize;
      const y = row * cellSize;

      ctx.fillStyle = 'white'; // Default cell color
      if (row === selectedCell?.row && col === selectedCell?.col) {
        ctx.fillStyle = 'lightblue'; // Highlight selected cell
      }

      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }

  // Highlight row and column on mouse hover
  // if (hoveredRow !== null && hoveredCol !== null) {
  //   ctx.fillStyle = 'yellow'; // Highlight color
  //   ctx.fillRect(hoveredCol * cellSize, 0, cellSize, 1000); // Highlight column
  //   ctx.fillRect(0, hoveredRow * cellSize, 1000, cellSize); // Highlight row
  // }
}

canvas.addEventListener('mousedown', (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const row = Math.floor(mouseY / cellSize);
  const col = Math.floor(mouseX / cellSize);

  selectedCell = { row, col };
  isDragging = true;
  dragStartCell = selectedCell;

  requestAnimationFrame(drawGrid);
});

let hoveredRow = null; // Track the row over which the mouse is hovering
let hoveredCol = null; // Track the column over which the mouse is hovering

canvas.addEventListener('mousemove', (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  
  // Clear the canvas before drawing new lines
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw horizontal line at (0, mouseY)
  ctx.beginPath();
  ctx.moveTo(0, mouseY);
  ctx.lineTo(mouseX, mouseY);
  ctx.strokeStyle = 'yellow';
  ctx.stroke();
  
  // Draw vertical line at (mouseX, 0)
  ctx.beginPath();
  ctx.moveTo(mouseX, 0);
  ctx.lineTo(mouseX, mouseY);
  ctx.strokeStyle = 'yellow';
  ctx.stroke();
  
  if (!isDragging) return;
  
  const newRow = Math.floor(mouseY / cellSize);
  const newCol = Math.floor(mouseX / cellSize);

  if (newRow !== selectedCell.row || newCol !== selectedCell.col) {
    // Highlight the new row and column
    selectedCell = { row: newRow, col: newCol };

    requestAnimationFrame(drawGrid);
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

function highlightRowAndColumn(row, col) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;

  // Highlight row
  ctx.beginPath();
  ctx.moveTo(0, row * cellSize);
  ctx.lineTo(1000, row * cellSize);
  ctx.stroke();

  // Highlight column
  ctx.beginPath();
  ctx.moveTo(col * cellSize, 0);
  ctx.lineTo(col * cellSize, 1000);
  ctx.stroke();
}

drawGrid();
