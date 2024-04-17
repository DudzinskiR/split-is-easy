import { ChatBubble3D, Phone3D, Phone3DProps } from "src/components";
import { Transform3D } from "src/utils/math";
import React from "react";
import { twMerge } from "tailwind-merge";
import {
  LoadingPageScreenshot1,
  LoadingPageScreenshot6,
} from "src/assets/landing-page";
interface PhonesProps extends Phone3DProps {
  transformA: Transform3D;
  transformB: Transform3D;
}

const renderChatBubble = (
  transform: Transform3D,
  text: string,
  side: "RIGHT" | "LEFT",
  animationDirect: "LEFT-RIGHT" | "UP-DOWN",
  length: number
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
          length={length}
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
          img={LoadingPageScreenshot6}
          additionalElements={[
            renderChatBubble(
              new Transform3D().setPosition(-props.width / 2 + 25, 100, 0),
              "FOR FAMILY",
              "RIGHT",
              "LEFT-RIGHT",
              150
            ),
            renderChatBubble(
              new Transform3D().setPosition(-150 + 25, 400, 0),
              "FOR STUDENTS",
              "RIGHT",
              "UP-DOWN",
              170
            ),
          ]}
        />

        <Phone3D
          {...props}
          transitionDuration={props.transitionDuration}
          transform={transformB}
          img={LoadingPageScreenshot1}
          additionalElements={[
            renderChatBubble(
              new Transform3D().addPosition(props.width * 1.5 - 53, 250, 0),
              "FOR TEAM",
              "LEFT",
              "LEFT-RIGHT",
              130
            ),
            renderChatBubble(
              new Transform3D().addPosition(props.width * 1.5 - 43, 550, 0),
              "FOR FRIENDS",
              "LEFT",
              "UP-DOWN",
              150
            ),
          ]}
        />
      </>
    );
  }
);
