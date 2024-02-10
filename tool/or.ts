import { PNG } from "pngjs";
import * as fs from "node:fs";
import { Bitmap } from "../src/bitmap";
import { Palette } from "../src/palette";

const main = async () => {
  const skin = 16772571;
  const out = new Bitmap();
  for (let i = 2; i < process.argv.length; i++) {
    const file = process.argv[i];
    const palette = Palette.load(file);
    for (let y = 0; y < 12; y++) {
      for (let x = 0; x < 16; x++) {
        const color = palette.get(y * 16 + x);
        if (color === skin) {
          out.set(x, y, skin);
        }
      }
    }
  }
  const op = new Palette<number>(0);
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      op.push(out.get(x, y));
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
};

main();
