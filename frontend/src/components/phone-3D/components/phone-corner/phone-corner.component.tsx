import { CSSProperties, useEffect, useState } from "react";
import { usePhone3DContext } from "../../hook";
import { getCornersStyles } from "./phone-corner.helper";

interface PhoneCornerProps {
  transform: string;
}

export const PhoneCorner = ({ transform }: PhoneCornerProps) => {
  const { height, radius, cornerNode } = usePhone3DContext();
  const [styles, setStyles] = useState<CSSProperties[]>([]);

  useEffect(() => {
    setStyles(getCornersStyles(cornerNode!, radius, height));
  }, [cornerNode, height, radius]);

  return (
    <div
      className="absolute"
      style={{
        top: radius,
        left: radius,
        position: "absolute",
        transform: transform,
        transformStyle: "preserve-3d",
      }}
    >
      {styles.map((_, index) => {
        return (
          <div
            className="absolute bg-slate-200"
            key={index}
            style={styles[index]}
          ></div>
        );
      })}
    </div>

    // </div>
  );
};
