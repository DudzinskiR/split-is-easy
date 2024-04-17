import { Transform3D } from "src/utils/math";
import { useChatBubble3DContext } from "../../hook";

export const ChatBubble3DBack = () => {
  const { transform, height, length, width, radius } = useChatBubble3DContext();
  return (
    <div
      style={{
        position: "absolute",
        transform: new Transform3D(transform)
          .addPosition(0, 0, -width / 2)
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
        <div className="flex justify-center items-center h-full font-semibold text-2xl"></div>
      </div>
    </div>
  );
};
