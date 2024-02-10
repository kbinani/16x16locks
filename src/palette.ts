import fs from "node:fs";
import { PNG } from "pngjs";
import { Bitmap } from "./bitmap";

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

  static load(file: string): Palette<number> {
    const data = fs.readFileSync(file);
    const img = PNG.sync.read(data);
    if (img.width !== img.height) {
      throw `width and height mismatch`;
    }
    if (img.width % 16 !== 0) {
      throw "width is not power of 16";
    }
    const scale = img.width / 16;
    const palette = new Palette<number>(0);
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        let r: number, g: number, b: number, a: number;
        [r, g, b, a] = [0, 0, 0, 0];
        for (let iy = 0; iy < scale; iy++) {
          for (let ix = 0; ix < scale; ix++) {
            const idx = ((y * scale + iy) * img.height + (x * scale + ix)) * 4;
            r += img.data[idx];
            g += img.data[idx + 1];
            b += img.data[idx + 2];
            a += img.data[idx + 3];
          }
        }
        r = Math.floor(r / scale ** 2);
        g = Math.floor(g / scale ** 2);
        b = Math.floor(b / scale ** 2);
        a = Math.floor(a / scale ** 2);
        let rgb = (r * 256 + g) * 256 + b;
        if (a <= 0) {
          rgb = 0;
        }
        palette.push(rgb);
      }
    }
    return palette;
  }
}
