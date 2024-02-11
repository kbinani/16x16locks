import * as React from "react";
import { useRef, useState } from "react";
import { generate, kDefaultRandom } from "../preset";
import { CharacterComponent } from "./character";
import XXH from "xxhashjs";
import MersenneTwister from "mersenne-twister";
import { Character } from "../types";

export const Main: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const update = () => {
    setCount(count + 1);
  };
  const ref = useRef<HTMLInputElement>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const onSubmit = () => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const name = element.value;
    const hash = XXH.h64();
    const day = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
    const seed = hash.init(0).update(name).update(`${day}`).digest();
    const mt = new MersenneTwister(seed.toNumber());
    setCharacter(generate({ gen: () => mt.random() }));
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
      <div>
        <input type={"text"} ref={ref} />
        <input type={"button"} onClick={onSubmit} />
        {character && <CharacterComponent character={character} size={20} />}
      </div>
    </div>
  );
};
