export class Bitmap<T> {
  private readonly bitmap: T[][]; // [x][y];
  constructor(provider: () => T) {
    const v = provider();
    this.bitmap = [];
    for (let y = 0; y < 16; y++) {
      this.bitmap.push([]);
      for (let x = 0; x < 16; x++) {
        this.bitmap[y].push(v);
      }
    }
  }

  get(x: number, y: number): T {
    return this.bitmap[x][y];
  }

  set(x: number, y: number, v: T) {
    this.bitmap[x][y] = v;
  }
}
