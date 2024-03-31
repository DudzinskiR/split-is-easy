interface PhoneFrontProps {
  text: string;
  width: number;
  height: number;
  length: number;
}

export const PhoneFront = ({
  text,
  width,
  height,
  length,
}: PhoneFrontProps) => {
  return (
    <div
      className="absolute bg-gradient-to-t from-cyan-500 to-blue-500 rounded-2xl"
      style={{
        transform: `translateZ(${length / 2}px)`,
        width: width,
        height: height,
      }}
    >
      <div className="absolute h-[calc(100%-4px)] w-[calc(100%-4px)] top-[2px] left-[2px] border-2 border-slate-600 rounded-2xl"></div>
      <div className="absolute h-[8px] w-1/2 bg-black bottom-[15px] translate-x-[50%] rounded-full"></div>
      <div
        className="border-8 border-black rounded-2xl box-border"
        style={{ width: width, height: height }}
      >
        <div className="w-full flex justify-center">
          <div className="w-1/2 bg-black h-[15px] rounded-b-lg"></div>
        </div>
        <div className="flex h-full justify-center items-center text-3xl text-white">
          - {text} -
        </div>
      </div>
    </div>
  );
};
