import { useSearchParams } from "react-router-dom";
import { PublicLoginBox } from "./login-box/public-login-box.component";
import { PublicSignUpBox } from "./sign-up-box/public-sign-up-box.component";

export const PublicLoginPage = () => {
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get("t") === "sign-up" ? "SIGN_UP" : "LOGIN";

  return (
    <div className="mt-20 w-full flex justify-center">
      <div className="max-w-7xl w-screen mb-5 flex justify-center">
        {viewType === "LOGIN" ? <PublicLoginBox /> : <PublicSignUpBox />}
      </div>
    </div>
  );
};
