import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, LineBreak } from "src/components";
import { InputText } from "src/components/inputs";
import { ButtonColor } from "src/enums";
import {
  getFirebaseErrorDescription,
  signInWithEmail,
  signInWithGoogle,
} from "src/utils/firebase";

export const PublicLoginBox = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginWithMail = async () => {
    const response = await signInWithEmail(email, password);
    if (response !== "SUCCESS") {
      setError(getFirebaseErrorDescription(response!));
    } else {
      navigate("/");
    }
  };

  const loginWithGoogle = async () => {
    const response = await signInWithGoogle();

    if (response === "SUCCESS") {
      navigate("/");
    }
  };

  return (
    <div className="lg:w-1/3 md:w-1/2 w-11/12 duration-150">
      <Box title="Login">
        <div className="text-center text-lg text-red-700 font-semibold">
          {error}
        </div>
        <div className="flex flex-col justify-center items-center">
          <form
            className="flex flex-col gap-6 w-3/4 py-5"
            onSubmit={(e) => {
              e.preventDefault();
              loginWithMail();
            }}
          >
            <InputText
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <InputText
              label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button text="Login" />
          </form>
          <LineBreak text="Or" className="w-11/12" lineClassName="border-b-2" />
          <div className="w-full flex flex-col items-center gap-5 my-5">
            <Button
              text="Google"
              color={ButtonColor.GREEN}
              className="w-3/4"
              onClick={loginWithGoogle}
            />
            <Button
              text="Sign Up"
              color={ButtonColor.PURPLE}
              className="w-3/4"
              to="/login?t=sign-up"
            />
          </div>
        </div>
      </Box>
    </div>
  );
};
