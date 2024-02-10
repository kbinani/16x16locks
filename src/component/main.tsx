import * as React from "react";
import { generate, kDefaultRandom } from "../preset";
import { CharacterComponent } from "./character";

export const Main: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
        <div style={{ margin: 10 }}>
          <CharacterComponent character={generate(kDefaultRandom)} size={20} />
        </div>
      </div>
    </div>
  );
};
