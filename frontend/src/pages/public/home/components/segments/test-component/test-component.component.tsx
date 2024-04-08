import { Phone3D } from "src/components";

const TestComponent = () => {
  return (
    <div className="w-full bg-white mt-20 right-0 h-screen select-none">
      <div
        className="right-1/2"
        style={{
          position: "absolute",
          perspective: 1500,
        }}
      >
        <div
          className=""
          style={{
            transformStyle: "preserve-3d",
            width: 200,
            height: 400,
            position: "absolute",
            transform: "translateX(0px) rotateX(0deg) rotateY(0deg)",
            transformOrigin: "center",
          }}
        >
          <Phone3D
            width={200}
            height={20}
            length={425}
            radius={20}
            rotate={{ x: 10, y: 20, z: 0 }}
            position={{ x: -50, y: 0, z: 0 }}
          />
          <Phone3D
            width={200}
            height={20}
            length={425}
            radius={20}
            rotate={{ x: 10, y: -20, z: 0 }}
            position={{ x: 100, y: 20, z: 40 }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
