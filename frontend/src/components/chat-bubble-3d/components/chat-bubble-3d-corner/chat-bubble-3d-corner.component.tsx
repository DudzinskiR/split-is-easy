import { Transform3D } from "src/utils/math";
import { useChatBubble3DContext } from "../../hook";
import { CSSProperties, useEffect, useState } from "react";
import { getCornersStyles } from "./chat-bubble-3d-corner.helper";

interface ChatBubble3DCornerProps {
  additionalTransform: Transform3D;
}

export const ChatBubble3DCorner = ({
  additionalTransform,
}: ChatBubble3DCornerProps) => {
  const [styles, setStyles] = useState<CSSProperties[]>([]);
  const { transform, cornerNode, radius, width, backgroundColor } =
    useChatBubble3DContext();

  useEffect(() => {
    setStyles(getCornersStyles(cornerNode!, radius, width));
  }, [cornerNode, width, radius]);
  return (
    <div
      className="absolute"
      style={{
        top: radius,
        left: radius,
        position: "absolute",
        transform: new Transform3D(transform)
          .addPosition(additionalTransform.position)
          .addRotation(additionalTransform.rotation)
          .toCSS(),
        transformStyle: "preserve-3d",
      }}
    >
      {styles.map((_, index) => {
        return (
          <div
            className="absolute"
            key={index}
            style={{ ...styles[index], background: backgroundColor }}
          ></div>
        );
      })}
    </div>
  );
};
