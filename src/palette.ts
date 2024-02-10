export class Palette<T> {
  private readonly _values: T[] = [];
  private readonly _indices: number[] = [];

  constructor(def: T) {
    this._values.push(def);
  }

  push(v: T): number {
    for (let i = 0; i < this._values.length; i++) {
      if (this._values[i] === v) {
        this._indices.push(i);
        return i;
      }
    }
    const idx = this._values.length;
    this._indices.push(idx);
    this._values.push(v);
    return idx;
  }

  get(i: number): T {
    return this._values[this._indices[i]];
  }

  palette(i: number): T {
    return this._values[i];
  }

  index(i: number): number {
    return this._indices[i];
  }

  values(): T[] {
    return [...this._values];
  }

  indices(): number[] {
    return [...this._indices];
  }

  each(cb: (i: number, v: T, index: number) => void) {
    for (let i = 0; i < this._indices.length; i++) {
      const idx = this._indices[i];
      cb(i, this._values[idx], idx);
    }
  }
}
