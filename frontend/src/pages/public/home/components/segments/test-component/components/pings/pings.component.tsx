import { Ping } from "src/components";
import { Vector2 } from "src/utils/math";

export const Pings = () => {
  return (
    <>
      <Ping
        position={new Vector2(-200, 300)}
        size={700}
        number={3}
        delay={5000}
        background={"#ffffff10"}
      />
      <Ping
        position={new Vector2(1200, 0)}
        size={400}
        number={5}
        delay={2000}
        background={"#ffffff10"}
      />
    </>
  );
};
