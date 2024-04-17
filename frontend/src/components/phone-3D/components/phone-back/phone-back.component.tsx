import { twJoin } from "tailwind-merge";
import { usePhone3DContext } from "../../hook/phone-3D.hook";
import { PROJECT_NAME } from "src/utils/const";

export const PhoneBack = () => {
  const { length, width, height, radius } = usePhone3DContext();
  return (
    <div
      className="absolute bg-zinc-800"
      style={{
        width: width,
        height: length,
        transform: `translateZ(-${height / 2}px)`,
        borderRadius: `${radius}px`,
      }}
    >
      <div
        className="text-3xl text-zinc-600 w-full text-center absolute top-[50%]"
        style={{
          transform: "rotateY(180deg) translateY(-50%)",
        }}
      >
        {PROJECT_NAME}
      </div>
      <div
        className={twJoin(
          "absolute w-[80px] h-[80px] right-[20px] top-[20px] rounded-xl",
          "shadow-[0px_0px_5px_3px_rgba(30,30,30,1)]",
          "bg-gradient-to-b from-[#3f3f46] to-[#313138]"
        )}
      >
        <div
          className={twJoin(
            "absolute bg-black h-[30px] w-[30px] right-[5px] top-[5px] rounded-full border-[1.5px] border-zinc-300",
            "shadow-[0px_0px_3px_2px_rgba(30,30,30,1)]"
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(0,81,136,1) 24%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)",
          }}
        ></div>
        <div
          className={twJoin(
            "absolute bg-black h-[30px] w-[30px] left-[5px] top-[25px] rounded-full border-[1.5px] border-zinc-300",
            "shadow-[0px_0px_3px_2px_rgba(30,30,30,1)]"
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(0,81,136,1) 24%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)",
          }}
        ></div>
        <div
          className={twJoin(
            "absolute bg-black h-[30px] w-[30px] right-[5px] top-[45px] rounded-full border-[1.5px] border-zinc-300",
            "shadow-[0px_0px_3px_2px_rgba(30,30,30,1)]"
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(0,81,136,1) 24%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)",
          }}
        ></div>
      </div>
    </div>
  );
};
