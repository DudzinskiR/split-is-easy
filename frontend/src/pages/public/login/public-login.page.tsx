import { useSearchParams } from "react-router-dom";
import { PublicLoginBox } from "./login-box/public-login-box.component";
import { PublicSignUpBox } from "./sign-up-box/public-sign-up-box.component";
import { PROJECT_NAME } from "src/utils/const";

export const PublicLoginPage = () => {
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get("t") === "sign-up" ? "SIGN_UP" : "LOGIN";

  return (
    <div className="w-full flex justify-center">
      <header className="fixed w-full flex justify-center bg-transparent z-[100] h-[60px] duration-500 overflow-hidden">
        <div
          className="absolute w-screen h-screen -z-10"
          style={{
            background:
              "linear-gradient(45deg, rgba(0,0,70,1) 0%, rgba(79,28,150,1) 33%, rgba(28,181,224,1) 100%)",
            backgroundAttachment: "scroll",
          }}
        >
          <div className="flex justify-center items-center h-[60px] text-2xl font-medium text-white/90 uppercase cursor-pointer">
            {PROJECT_NAME}
          </div>
        </div>
      </header>
      <div className="max-w-7xl mt-20 w-screen mb-5 flex justify-center">
        {viewType === "LOGIN" ? <PublicLoginBox /> : <PublicSignUpBox />}
      </div>
    </div>
  );
};
