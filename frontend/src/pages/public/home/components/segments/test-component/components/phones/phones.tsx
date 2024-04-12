import { ChatBubble3D, Phone3D, Phone3DProps } from "src/components";
import { Transform3D } from "src/utils/math";
import React from "react";
import { twMerge } from "tailwind-merge";
interface PhonesProps extends Phone3DProps {
  transformA: Transform3D;
  transformB: Transform3D;
}

const renderChatBubble = (
  transform: Transform3D,
  text: string,
  side: "RIGHT" | "LEFT",
  animationDirect: "LEFT-RIGHT" | "UP-DOWN"
) => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        animationFillMode: "forwards",
        animationDelay: "2.2s",
      }}
      className="animate-show scale-0"
    >
      <div
        style={{ transformStyle: "preserve-3d" }}
        className={twMerge(
          animationDirect
            ? animationDirect === "LEFT-RIGHT"
              ? "animate-chat-bubble-move-left-right"
              : "animate-chat-bubble-move-up-down"
            : ""
        )}
      >
        <ChatBubble3D
          transform={transform}
          text={text}
          width={30}
          height={60}
          length={200}
          radius={10}
          backgroundColor="rgb(129 140 248)"
          side={side}
        />
      </div>
    </div>
  );
};

export const Phones = React.memo(
  ({ transformA, transformB, ...props }: PhonesProps) => {
    return (
      <>
        <Phone3D
          {...props}
          transitionDuration={props.transitionDuration}
          transform={transformA}
          additionalElements={[
            renderChatBubble(
              new Transform3D().setPosition(-props.width / 2, 100, 0),
              "FOR FAMILY",
              "RIGHT",
              "LEFT-RIGHT"
            ),
            renderChatBubble(
              new Transform3D().setPosition(-150, 400, 0),
              "FOR STUDENTS",
              "RIGHT",
              "UP-DOWN"
            ),
          ]}
        />

        <Phone3D
          {...props}
          transitionDuration={props.transitionDuration}
          transform={transformB}
          additionalElements={[
            renderChatBubble(
              new Transform3D().addPosition(props.width * 1.5, 250, 0),
              "FOR TEAM",
              "LEFT",
              "LEFT-RIGHT"
            ),
            renderChatBubble(
              new Transform3D().addPosition(props.width * 1.5, 550, 0),
              "FOR FRIENDS",
              "LEFT",
              "UP-DOWN"
            ),
          ]}
        />
      </>
    );
  }
);
