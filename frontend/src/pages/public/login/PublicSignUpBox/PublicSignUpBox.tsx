import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button/Button";
import { InputText } from "src/components/inputs/InputText/InputText";
import { LineBreak } from "src/components/LineBreak/LineBreak";
import { getFirebaseErrorDescription } from "src/utils/firebase/firebaseErrorDescription";
import {
  signInWithGoogle,
  signUpWithMail,
} from "src/utils/firebase/firebaseHelper";

export const PublicSignUpBox = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    const response = await signUpWithMail(email, password);
    if (response !== "SUCCESS") {
      setError(getFirebaseErrorDescription(response!));
    } else {
      navigate("/");
    }
  };

  const loginWithGoogle = async () => {
    await signInWithGoogle();
    navigate("/");
  };

  return (
    <div className="lg:w-1/3 md:w-1/2 w-11/12 duration-150">
      <div className="bg-clip-padding backdrop-filter backdrop-blur bg-[#04050e] bg-opacity-70 z-10 mt-20">
        <div className="text-white text-center text-3xl py-5 font-bold">
          Login
        </div>
        <div className="text-center text-lg text-red-700 font-semibold">
          {error}
        </div>
        <div className="flex flex-col justify-center items-center">
          <form
            className="flex flex-col gap-6 w-3/4 py-5"
            onSubmit={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            <InputText
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white focus:bg-white"
              autoComplete="off"
            />
            <InputText
              label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white focus:bg-white"
            />
            <InputText
              label="confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white focus:bg-white"
            />
            <Button
              text="Sign up"
              disabled={confirmPassword !== password}
              color="bg-white hover:bg-slate-200 text-slate-900 text-2xl"
            />
          </form>
          <LineBreak
            text="Or"
            className="w-11/12 text-slate-200"
            lineClassName="border-b-2 border-slate-200"
          />
          <div className="w-full flex flex-col items-center gap-5 my-5">
            <Button
              text="Google"
              color="bg-white hover:bg-slate-200 text-slate-900 text-xl"
              className="w-3/4"
              onClick={loginWithGoogle}
            />
            <Button
              text="Login"
              color="bg-white hover:bg-slate-200 text-slate-900 text-xl"
              className="w-3/4"
              to="/login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
