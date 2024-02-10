export class Bitmap {
  private readonly bitmap: number[][]; // [x][y];
  constructor() {
    this.bitmap = [];
    for (let y = 0; y < 16; y++) {
      this.bitmap.push([]);
      for (let x = 0; x < 16; x++) {
        this.bitmap[y].push(0);
      }
    }
  }

  get(x: number, y: number): number {
    return this.bitmap[x][y];
  }

  set(x: number, y: number, v: number) {
    this.bitmap[x][y] = v;
  }
}
