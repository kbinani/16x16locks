export type Pixels = {
  colors: number[][]; // [y][x], 0 = transparent
  palette: number[];
};

export type Character = {
  head: Pixels;
  eye: number;
  hair: Pixels;
  body: Pixels;
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
