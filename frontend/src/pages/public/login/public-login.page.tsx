import { Link, useSearchParams } from "react-router-dom";
import { PublicLoginBox } from "./login-box/public-login-box.component";
import { PublicSignUpBox } from "./sign-up-box/public-sign-up-box.component";
import { Background1 } from "src/assets/landing-page/background";
import { PROJECT_NAME } from "src/utils/const/text-const";

export const PublicLoginPage = () => {
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get("t") === "sign-up" ? "SIGN_UP" : "LOGIN";

  return (
    <div className="flex justify-center bg-[#0e1129] h-screen w-screen">
      <div className="blur-lg w-full absolute h-full">
        <Background1 className="absolute left-0 top-0 scale-x-[-1]" />
        <Background1 className="absolute right-0 bottom-0 scale-y-[-1]" />
      </div>

      <header className="fixed w-full flex justify-center z-[100] h-[60px] duration-500 overflow-hidden bg-clip-padding backdrop-filter backdrop-blur bg-[#04050e] bg-opacity-70">
        <div className="flex justify-center items-center h-[60px] text-2xl font-medium text-white/90 uppercase cursor-pointer">
          <Link to={"/"}>{PROJECT_NAME}</Link>
        </div>
      </header>
      <div className="max-w-7xl mt-20 w-screen mb-5 flex justify-center">
        {viewType === "LOGIN" ? <PublicLoginBox /> : <PublicSignUpBox />}
      </div>
    </div>
  );
};
