import { Transform3D, Vector2 } from "src/utils/math";
import { ChatBubble3DContextProvider } from "./context";
import {
  ChatBubble3DBack,
  ChatBubble3DCorner,
  ChatBubble3DFront,
  ChatBubble3DSide,
} from "./components";

export interface ChatBubble3DProps {
  transform: Transform3D;
  text: string;
  width: number;
  height: number;
  length: number;
  radius: number;
  cornerNode?: number;
  backgroundColor?: string;
  side?: "LEFT" | "RIGHT";
}

export const ChatBubble3D = ({
  transform,
  text,
  width,
  height,
  length,
  radius,
  cornerNode = 2,
  backgroundColor = "#ffffff",
  side,
}: ChatBubble3DProps) => {
  // return <></>;
  const getSizeMultiply = () => {
    if (side === undefined) return 0;

    if (side === "LEFT") {
      return -1;
    }

    if (side === "RIGHT") {
      return 1;
    }

    return 0;
  };

  return (
    <ChatBubble3DContextProvider
      value={{
        transform,
        text,
        width,
        height,
        length,
        radius,
        cornerNode,
        backgroundColor,
        side,
      }}
    >
      <ChatBubble3DFront />
      <ChatBubble3DBack />

      {/*      */}
      {/* SIDE */}
      {/*      */}

      {/* TOP */}
      <ChatBubble3DSide
        additionalTransform={new Transform3D()
          .setRotate(90, 0, 0)
          .setPosition(0, -height / 2, 0)}
        size={new Vector2(length - radius * 2, width)}
      />

      {/* BOTTOM */}
      <ChatBubble3DSide
        additionalTransform={new Transform3D()
          .setRotate(90, 0, 0)
          .setPosition(0 + getSizeMultiply() * radius, height / 2, 0)}
        size={
          new Vector2(
            length - radius * 2 + (side !== undefined ? radius * 2 : 0),
            width
          )
        }
      />

      {/* LEFT */}
      <ChatBubble3DSide
        additionalTransform={new Transform3D()
          .setRotate(90, 0, 90)
          .setPosition(-length / 2, 0, 0)}
        size={new Vector2(height - radius * 2, width)}
      />

      {/* RIGHT */}
      <ChatBubble3DSide
        additionalTransform={new Transform3D()
          .setRotate(90, 0, 90)
          .setPosition(length / 2, 0, 0)}
        size={new Vector2(height - radius * 2, width)}
      />

      {/*         */}
      {/* CORNERS */}
      {/*         */}

      {/* TOP LEFT */}
      <ChatBubble3DCorner
        additionalTransform={new Transform3D().setPosition(
          -length / 2,
          -height / 2,
          0
        )}
      />

      {/* BOTTOM LEFT */}
      <ChatBubble3DCorner
        additionalTransform={new Transform3D()
          .setPosition(-length / 2, height / 2 - radius * 2, 0)
          .addRotation(0, 0, 270)}
      />

      {/* TOP RIGHT */}
      <ChatBubble3DCorner
        additionalTransform={new Transform3D()
          .setPosition(length / 2 - radius * 2, -height / 2, 0)
          .addRotation(180, 180, 270)}
      />

      {/* BOTTOM RIGHT */}
      <ChatBubble3DCorner
        additionalTransform={new Transform3D()
          .setPosition(length / 2 - radius * 2, height / 2 - radius * 2, 0)
          .addRotation(180, 0, 270)}
      />
    </ChatBubble3DContextProvider>
  );
};
