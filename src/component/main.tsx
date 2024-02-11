import * as React from "react";
import { generate, kDefaultRandom } from "../preset";
import { CharacterComponent } from "./character";
import { useState } from "react";

export const Main: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const update = () => {
    setCount(count + 1);
  };
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
      <div style={{ userSelect: "none", cursor: "pointer" }} onClick={update}>
        Next
      </div>
    </div>
  );
};
