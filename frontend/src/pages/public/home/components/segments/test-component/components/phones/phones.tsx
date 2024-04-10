import { Phone3D, Phone3DProps } from "src/components";
import { Transform3D } from "src/utils/math";

interface PhonesProps extends Phone3DProps {
  transformA: Transform3D;
  transformB: Transform3D;
}

export const Phones = ({ transformA, transformB, ...props }: PhonesProps) => {
  return (
    <>
      <Phone3D {...props} transform={transformA} />
      <Phone3D {...props} transform={transformB} />
    </>
  );
};
