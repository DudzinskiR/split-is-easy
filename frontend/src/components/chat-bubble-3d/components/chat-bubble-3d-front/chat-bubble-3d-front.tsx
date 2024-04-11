import { Transform3D } from "src/utils/math";
import { useChatBubble3DContext } from "../../hook";

export const ChatBubble3DFront = () => {
  const { transform, height, length, text, width, radius, side, icon } =
    useChatBubble3DContext();

  const renderRightArrow = () => {
    if (side === "RIGHT") {
      return (
        <>
          <div
            className="absolute bg-white border-b-2 border-indigo-700"
            style={{
              height: radius,
              width: radius * 2,
              top: height / 2 - radius - 0,
              left: length / 2 - radius * 2 + 1,
            }}
          ></div>
          <div
            className="absolute bg-white border-b-2 border-indigo-700"
            style={{
              height: radius * 2,
              width: radius * 2,
              top: height / 2 - radius * 2,
              left: length / 2 - 2.5 - 2,
              clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
            }}
          ></div>
          <div
            className="absolute w-[60px]"
            style={{
              top: -30,
              left: -100,
            }}
          >
            {icon}
          </div>
        </>
      );
    }

    return <></>;
  };

  const renderLeftArrow = () => {
    if (side === "LEFT") {
      return (
        <>
          <div
            className="absolute bg-white border-b-2 border-indigo-700"
            style={{
              height: radius,
              width: radius * 2,
              top: height / 2 - radius - 0,
              left: -length / 2 + 1,
            }}
          ></div>
          <div
            className="absolute bg-white border-b-2 border-indigo-700"
            style={{
              height: radius * 2,
              width: radius * 2,
              top: height / 2 - radius * 2,
              left: -length / 2 - width / 2 - 2,
              clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
            }}
          ></div>
        </>
      );
    }

    return <></>;
  };

  return (
    <div
      style={{
        position: "absolute",
        transform: new Transform3D(transform)
          .addPosition(0, 0, width / 2)
          .toCSS(),
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute bg-white absolute-center border-2 border-indigo-700"
        style={{
          borderRadius: radius,
          width: length,
          height: height,
        }}
      >
        <div className="flex justify-center items-center h-full font-semibold text-xl ml-[50px]">
          {text}
        </div>
      </div>
      {renderRightArrow()}
      {renderLeftArrow()}
    </div>
  );
};
