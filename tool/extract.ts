import { PNG } from "pngjs";
import * as fs from "node:fs";
import { Palette } from "../src/palette";

const main = async () => {
  const file = process.argv[2];
  const take: number[] = [];
  for (let i = 3; i < process.argv.length; i++) {
    const v = process.argv[i];
    const idx = Number.parseInt(v, 16);
    take.push(idx);
  }
  const palette = Palette.load(file);
  for (let y = 0; y < 16; y++) {
    let line = "";
    for (let x = 0; x < 16; x++) {
      const paletteIndex = palette.index(y * 16 + x);
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
      const paletteIndex = palette.index(y * 16 + x);
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
