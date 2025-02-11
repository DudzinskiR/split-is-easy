import { Background1 } from "src/assets/landing-page/background";

export const PublicLoadingScreen = () => {
  return (
    <div className="flex justify-center bg-[#0e1129] h-screen w-screen">
      <div className="blur-lg w-full absolute h-full">
        <Background1 className="absolute right-0 top-0" />
      </div>
    </div>
  );
};
