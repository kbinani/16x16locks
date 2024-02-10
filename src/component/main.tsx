import * as React from "react";
import { generate, image, kDefaultRandom } from "../preset";
import { useMemo } from "react";
import { CharacterComponent } from "./character";

export const Main: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <CharacterComponent character={generate(kDefaultRandom)} size={20} />
      <CharacterComponent character={generate(kDefaultRandom)} size={20} />
    </div>
  );
};
