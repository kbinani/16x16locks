import * as React from "react";
import { generate, image, kDefaultRandom } from "../preset";
import { useMemo } from "react";

function range(max: number): number[] {
  const a: number[] = [];
  for (let i = 0; i < max; i++) {
    a.push(i);
  }
  return a;
}
const zt16 = range(16);

export const Main: React.FC = () => {
  const character = generate(kDefaultRandom);
  const bmp = useMemo(() => {
    return image(character);
  }, [character]);
  const scale = 20;
  return (
    <>
      {zt16.map((y) => {
        return (
          <div
            key={y}
            style={{
              width: scale,
              height: scale,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <>
              {zt16.map((x) => {
                const rgb = bmp.get(x, y);
                const r = Math.floor(0xff & (rgb >> 16));
                const g = Math.floor(0xff & (rgb >> 8));
                const b = Math.floor(0xff & rgb);
                const a = rgb === 0 ? 0 : 1;
                return (
                  <div
                    key={`${x},${y}`}
                    style={{
                      width: scale,
                      height: scale,
                      minWidth: scale,
                      display: "flex",
                      backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                    }}
                  ></div>
                );
              })}
            </>
          </div>
        );
      })}
    </>
  );
};
