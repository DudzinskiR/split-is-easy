import { ChatBubble3D, Phone3D, Phone3DProps } from "src/components";
import { Transform3D } from "src/utils/math";
import FamilyIcon from "src/assets/family-icon.svg?react";
import React from "react";
interface PhonesProps extends Phone3DProps {
  transformA: Transform3D;
  transformB: Transform3D;
}

export const Phones = React.memo(
  ({ transformA, transformB, ...props }: PhonesProps) => {
    return (
      <>
        <Phone3D
          {...props}
          transitionDuration={props.transitionDuration}
          transform={transformA}
          additionalElements={[
            <ChatBubble3D
              transform={new Transform3D().setPosition(
                -props.width / 2,
                100,
                0
              )}
              text={"FOR FAMILY"}
              width={30}
              height={60}
              length={200}
              radius={10}
              backgroundColor="rgb(129 140 248)"
              side="RIGHT"
              icon={<FamilyIcon />}
              animationDirect="LEFT-RIGHT"
            />,
            <ChatBubble3D
              transform={new Transform3D().setPosition(-150, 400, 0)}
              text={"FOR STUDENTS"}
              width={30}
              height={60}
              length={200}
              radius={10}
              backgroundColor="rgb(129 140 248)"
              side="RIGHT"
              animationDirect="UP-DOWN"
            />,
          ]}
        />

        <Phone3D
          {...props}
          transitionDuration={props.transitionDuration}
          transform={transformB}
          additionalElements={[
            <ChatBubble3D
              transform={new Transform3D().addPosition(
                props.width * 1.5,
                250,
                0
              )}
              text={"FOR TEAM"}
              width={30}
              height={60}
              length={200}
              radius={10}
              backgroundColor="rgb(129 140 248)"
              side="LEFT"
              animationDirect="LEFT-RIGHT"
            />,
            <ChatBubble3D
              transform={new Transform3D().addPosition(
                props.width * 1.5,
                550,
                0
              )}
              text={"FOR FRIEND"}
              width={30}
              height={60}
              length={200}
              radius={10}
              backgroundColor="rgb(129 140 248)"
              side="LEFT"
              animationDirect="UP-DOWN"
            />,
          ]}
        />
      </>
    );
  }
);
