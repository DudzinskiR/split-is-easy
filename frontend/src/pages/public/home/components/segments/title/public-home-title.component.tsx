import previewIMG from "src/assets/preview.png";
import { Button } from "src/components";
import { ButtonColor } from "src/enums";

export const PublicHomeTitleSegment = () => {
  return (
    <section className="flex flex-col md:flex-row justify-around items-center gap-5 bg-white mt-10 pt-10">
      <div className="flex flex-col items-center justify-center w-full sm:w-1/3 mt-5 sm:mt-0 gap-5">
        <h1>
          <p className="text-5xl font-semibold text-center">
            Shared Bills, Shared Experiences
          </p>
          <p className="text-center text-xl">
            Our app makes finances easy and enjoyable!
          </p>
        </h1>
        <div className="flex sm:flex-row flex-col justify-around items-center gap-5 w-full">
          <Button text="Login" className="w-40" to="/login" />
          <Button
            text="Sign up"
            className="w-40"
            color={ButtonColor.PURPLE}
            to="/login?t=sign-up"
          />
        </div>
      </div>
      <img src={previewIMG}></img>
    </section>
  );
};
