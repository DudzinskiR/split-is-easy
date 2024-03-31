interface PhoneBackProps {
  width: number;
  height: number;
  length: number;
}

export const PhoneBack = ({ width, height, length }: PhoneBackProps) => {
  return (
    <div
      className="absolute bg-red-500 rounded-2xl"
      style={{ width: width, height: height }}
    ></div>
  );
};
