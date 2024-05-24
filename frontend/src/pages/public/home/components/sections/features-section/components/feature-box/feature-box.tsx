import { twMerge } from "tailwind-merge";

interface FeatureBoxProps {
  className?: string;
  img: string;
  title: string;
  subtitle: string;
}

export const FeatureBox = ({
  img,
  title,
  subtitle,
  className,
}: FeatureBoxProps) => {
  return (
    <div
      className={twMerge(
        "bg-red-500  w-[300px] h-[400px]  bg-cover bg-center rounded-[40px] rounded-tl-none border-2 border-slate-800 relative",
        "sm:w-[400px] sm:h-[500px]",
        "lg:w-[250px] lg:h-[300px]",
        "xl:w-[300px] xl:h-[350px]",
        className
      )}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-clip-padding backdrop-filter backdrop-blur bg-[#04050e] bg-opacity-70 w-full h-[100px] absolute bottom-0 rounded-[40px] border-t-2 border-slate-800">
        <div className="text-slate-300 text-xl mt-3 ml-5">{title}</div>
        <div className="text-slate-300 xl:text-base text-sm px-4 mt-2">
          {subtitle}
        </div>
      </div>
    </div>
  );
};