import { usePhone3DContext } from "../../hook/phone-3D.hook";

interface PhoneFrontProps {
  text: string;
}

export const PhoneFront = ({ text }: PhoneFrontProps) => {
  const { length, width, height, radius } = usePhone3DContext();

  return (
    <div
      className="absolute bg-gradient-to-t from-cyan-500 to-blue-500"
      style={{
        transform: `translateZ(${height / 2}px)`,
        width: width,
        height: length,
        borderRadius: `${radius}px`,
      }}
    >
      <div
        className="absolute h-[calc(100%-4px)] w-[calc(100%-4px)] top-[2px] left-[2px] border-[1.5px] border-zinc-600"
        style={{ borderRadius: `${radius}px` }}
      ></div>
      <div className="absolute h-[8px] w-1/2 bg-zinc-900 bottom-[15px] translate-x-[50%] rounded-full shadow-[0px_0px_4px_2px_rgba(50,50,50,0.3)]"></div>
      <div
        className="border-[8px] border-zinc-900 box-border"
        style={{
          width: width,
          height: length,
          borderRadius: `${radius}px`,
          boxShadow: "inset 0px 0px 4px 2px rgba(50, 50, 50, 0.3)",
        }}
      >
        <div className="w-full flex justify-center">
          <div className="relative w-1/2 bg-zinc-900 h-[15px] rounded-b-lg flex items-center shadow-[0px_2px_3px_1px_rgba(50,50,50,0.5)]">
            <div className="w-[8px] h-[8px] bg-zinc-800 rounded-full absolute left-[10px] top-[2px]"></div>
          </div>
        </div>
        <div className="flex h-full justify-center items-center text-3xl text-white">
          - {text} -
        </div>
      </div>
    </div>
  );
};
