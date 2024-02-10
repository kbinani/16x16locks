export type Pixels = {
  colors: number[][]; // [y][x], 0 = transparent
  palette: number[];
};

export type Head = Pixels & {
  hasEyeSocket: boolean;
};

export type Character = {
  head: Head;
  eye: number;
  hair: Pixels;
  body: Pixels;
  arm: Pixels;
};

export function empty(): Pixels {
  const colors: number[][] = [];
  for (let i = 0; i < 16; i++) {
    const row: number[] = [];
    for (let j = 0; j < 16; j++) {
      row.push(0);
    }
    colors.push(row);
  }
  return { colors, palette: [0] };
}
