import { PNG } from "pngjs";
import * as fs from "node:fs";
import { Bitmap } from "../src/bitmap";
import { Palette } from "../src/palette";

const main = async () => {
  const file = process.argv[2];
  const take: number[] = [];
  for (let i = 3; i < process.argv.length; i++) {
    const v = process.argv[i];
    const idx = Number.parseInt(v, 16);
    take.push(idx);
  }
  const data = fs.readFileSync(file);
  const img = PNG.sync.read(data);
  if (img.width !== img.height) {
    console.error(`width and height mismatch`);
    return;
  }
  if (img.width % 16 !== 0) {
    console.error("width is not power of 16");
    return;
  }
  const scale = img.width / 16;
  const bitmap = new Bitmap<number>(() => 0);
  const palette = new Palette<number>(0);
  palette.push(0);
  for (let y = 0; y < 16; y++) {
    let line = "";
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
      const paletteIndex = palette.push(rgb);
      bitmap.set(x, y, paletteIndex);
      line += paletteIndex.toString(16);
    }
    console.log(line);
  }
  console.log(`----------------`);
  const out = new PNG({ width: 16, height: 16, filterType: 4 });
  const op = new Palette<number>(0);
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const idx = (y * 16 + x) * 4;
      const paletteIndex = bitmap.get(x, y);
      if (take.includes(paletteIndex)) {
        const rgb = palette.palette(paletteIndex);
        out.data[idx] = 0xff & (rgb >> 16);
        out.data[idx + 1] = 0xff & (rgb >> 8);
        out.data[idx + 2] = 0xff & rgb;
        out.data[idx + 3] = 0xff;
        op.push(rgb);
      } else {
        op.push(0);
      }
    }
  }
  console.log(`{`);
  console.log(`  colors: [`);
  for (let y = 0; y < 16; y++) {
    const row: number[] = [];
    for (let x = 0; x < 16; x++) {
      const i = op.index(y * 16 + x);
      row.push(i);
    }
    console.log(`    [${row.join(",")}],`);
  }
  console.log(`  ],`);
  console.log(`  palette: [${op.values().join(", ")}]`);
  console.log(`}`);
  fs.writeFileSync("out.png", PNG.sync.write(out));
};

main();
