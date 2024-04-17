import { Transform3D, Vector2 } from "src/utils/math";
import { useChatBubble3DContext } from "../../hook";

interface ChatBubble3DSide {
  additionalTransform: Transform3D;
  size: Vector2;
}

export const ChatBubble3DSide = ({
  additionalTransform,
  size,
}: ChatBubble3DSide) => {
  const { transform, backgroundColor } = useChatBubble3DContext();

  return (
    <div
      style={{
        position: "absolute",
        transform: new Transform3D(transform)
          .addPosition(additionalTransform.position)
          .addRotation(additionalTransform.rotation)
          .toCSS(),
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute bg-indigo-400 absolute-center"
        style={{
          background: backgroundColor,
          width: size.x,
          height: size.y,
        }}
      >
        <div className="flex justify-center items-center h-full font-semibold text-2xl"></div>
      </div>
    </div>
  );
};
