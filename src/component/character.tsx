import * as React from "react";
import { FC, useMemo } from "react";
import { Character } from "../types";
import { image } from "../preset";

function range(max: number): number[] {
  const a: number[] = [];
  for (let i = 0; i < max; i++) {
    a.push(i);
  }
  return a;
}
const zt16 = range(16);

export const CharacterComponent: FC<{ character: Character; size: number }> = ({
  character,
  size,
}) => {
  const bmp = useMemo(() => {
    return image(character);
  }, [character]);
  return (
    <div style={{ minWidth: size * 16, minHeight: size * 16 }}>
      {zt16.map((y) => {
        return (
          <div
            key={y}
            style={{
              minWidth: size,
              minHeight: size,
              display: "flex",
              flexDirection: "row",
              margin: 0,
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
                    key={x}
                    style={{
                      minWidth: size,
                      minHeight: size,
                      display: "flex",
                      margin: 0,
                      backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                    }}
                  ></div>
                );
              })}
            </>
          </div>
        );
      })}
    </div>
  );
};
