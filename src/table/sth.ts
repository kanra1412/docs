import { Directive, ElementRef, HostListener, Input, NgZone } from '@angular/core';

// <canvas appCanvasGrid [gridWidth]="2500" [gridHeight]="2500"></canvas>
// <canvas
//   appCanvasGrid
//   [gridWidth]="gridWidth"
//   [gridHeight]="gridHeight"
//   [cellSize]="cellSize"
//   [spacing]="spacing"
// ></canvas>

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   if (url === '/' || url.startsWith('/index')) {
//     sendFile(res, path.join(__dirname, 'dist/index.html'));
//   } else {
//     forwardRequest(req, res, url);
//   }
// });

// function sendFile(res, filePath) {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.statusCode = 500;
//       res.end('Internal Server Error');
//       return;
//     }

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end(data);
//   });
// }
@Directive({
  selector: '[appCanvasGrid]',
  exportAs: 'appCanvasGrid',
})
export class CanvasGridDirective {
  @Input() cellSize = 50; // Cell size including spacing
  @Input() spacing = 8; // Spacing between cells
  @Input() gridWidth = 2500; // Width of the grid
  @Input() gridHeight = 2500; // Height of the grid

  private ctx: CanvasRenderingContext2D;
  private selectedCells: Set<string> = new Set(); // Set to store selected cell coordinates

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    const canvas = this.elementRef.nativeElement as HTMLCanvasElement;
    canvas.width = this.gridWidth;
    canvas.height = this.gridHeight;

    this.ctx = canvas.getContext('2d');
    this.drawGrid();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const cellX = Math.floor((event.offsetX + this.spacing) / this.cellSize);
    const cellY = Math.floor((event.offsetY + this.spacing) / this.cellSize);

    if (cellX >= 0 && cellX < this.gridWidth / this.cellSize && cellY >= 0 && cellY < this.gridHeight / this.cellSize) {
      this.ngZone.runOutsideAngular(() => {
        const cellKey = `<span class="math-inline">\{cellX\},</span>{cellY}`;

        if (this.selectedCells.has(cellKey)) {
          // Deselect the cell if it's already selected
          this.selectedCells.delete(cellKey);
        } else {
          // Select the cell
          this.selectedCells.add(cellKey);
        }

        this.drawGrid();
      });
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const cellX = Math.floor((event.offsetX + this.spacing) / this.cellSize);
    const cellY = Math.floor((event.offsetY + this.spacing) / this.cellSize);

    if (cellX >= 0 && cellX < this.gridWidth / this.cellSize && cellY >= 0 && cellY < this.gridHeight / this.cellSize) {
      this.ngZone.runOutsideAngular(() => {
        this.selectedCells.clear(); // Clear previous selections

        const cellKey = `<span class="math-inline">\{cellX\},</span>{cellY}`;
        this.selectedCells.add(cellKey); // Select the current cell

        this.drawGrid();
      });
    }
  }

  private drawGrid() {
    this.ctx.clearRect(0, 0, this.gridWidth, this.gridHeight);

    // Draw cell borders
    for (let i = 0; i < this.gridWidth / this.cellSize; i++) {
      for (let j = 0; j < this.gridHeight / this.cellSize; j++) {
        const x = i * this.cellSize + this.spacing;
        const y = j * this.cellSize + this.spacing;

        const cellKey = `<span class="math-inline">\{i\},</span>{j}`;
        const isSelected = this.selectedCells.has(cellKey);

        this.ctx.strokeStyle = isSelected ? '#00FF00' : '#0000FF'; // Green border for selected cells
        this.ctx.strokeRect(x, y, this.cellSize - this.spacing, this.cellSize - this.spacing);
      }
    }

    // Draw checkmark icon for selected cells
    for (const cellKey of this.selectedCells) {
      const [cellX, cellY] = cellKey.split(',').map(Number);

      const x = cellX * this.cellSize + this.spacing + this.cellSize / 4;
      const y = cellY * this.cellSize + this.spacing + this.cellSize / 4;

      this.ctx.fillStyle = '#00FF00'; // Green fill
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize / 2);
      this.ctx.lineTo(x + this.cellSize - this.cellSize / 4, y);
      this.ctx.fill();
    }
  }
}
