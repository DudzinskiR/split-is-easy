import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Phones } from "./phones";
import { useRotatePhones } from "../../segments/main-segment/hooks";
import { Ping, RandomRevealText } from "src/components";
import { Background1 } from "src/assets/landing-page/background";
import { Vector2 } from "src/utils/math";

export const HeroSection = () => {
  const { rotation, containerRef, phonesRef } = useRotatePhones();

  return (
    <>
      <div
        className="relative flex justify-center h-[850px] w-screen bg-[#0e1129]"
        ref={containerRef}
      >
        <Background1 className="absolute right-0 top-0" />
        <Ping
          position={new Vector2(100, 350)}
          size={500}
          number={5}
          delay={5000}
          background={"#ffffff05"}
        />
        <div className="relative max-w-7xl w-full h-full">
          <div className="absolute absolute-center-y text-center">
            <RandomRevealText
              text={"Shared Bills"}
              className="text-center 2xl:text-6xl lg:text-5xl text-3xl font-bold text-white"
              delay={0.5}
            />
            <RandomRevealText
              text={"Shared Experiences"}
              className="text-center 2xl:text-6xl lg:text-5xl text-3xl font-bold text-white lg:mt-2 mt-0"
              delay={1}
            />
            <RandomRevealText
              text={"Our app makes finances easy and enjoyable!"}
              className="text-center 2xl:text-3xl lg:text-2xl text-lg font-bold text-white lg:mt-10 mt-2"
              delay={1.5}
            />
          </div>
          <div className="h-full w-full absolute left-[30%]" ref={phonesRef}>
            <Canvas
              linear
              // onCreated={({ gl }) => {
              //   gl.outputEncoding = THREE.sRGBEncoding;
              // }}
            >
              {/* <ambientLight intensity={0.3} /> */}
              {/* <ambientLight intensity={0.5} /> */}
              {/* <pointLight position={[10, 10, 10]} intensity={1} /> */}
              <Phones rotation={rotation} />
              <Environment preset="warehouse" />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
};