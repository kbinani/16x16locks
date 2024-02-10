import { generate, image, kDefaultRandom } from "../src/preset";
import { PNG } from "pngjs";
import fs from "node:fs";

const character = generate(kDefaultRandom);
const out = image(character);
const png = new PNG({ width: 16, height: 16, filterType: 4 });
for (let y = 0; y < 16; y++) {
  for (let x = 0; x < 16; x++) {
    const idx = (y * 16 + x) * 4;
    const rgb = out.get(x, y);
    if (rgb !== 0) {
      png.data[idx] = 0xff & (rgb >> 16);
      png.data[idx + 1] = 0xff & (rgb >> 8);
      png.data[idx + 2] = 0xff & rgb;
      png.data[idx + 3] = 0xff;
    }
  }
}
fs.writeFileSync("gen.png", PNG.sync.write(png));
