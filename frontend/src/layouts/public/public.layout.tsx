import { Link } from "react-router-dom";
import { Button } from "src/components";
import { ButtonColor } from "src/enums";
import PublicRoutes from "src/routes/public/public.route";
import { PROJECT_NAME } from "src/utils/const";

const PublicLayout = () => {
  return (
    <>
      <header className="fixed w-full h-16 shadow-md flex justify-center bg-white z-[100]">
        <div className="flex flex-row justify-around items-center max-w-7xl w-screen">
          <Link to="/">
            <div className="text-2xl font-semibold">{PROJECT_NAME}</div>
          </Link>
          <Button
            color={ButtonColor.PURPLE}
            text="Login"
            className="h-12 w-32"
            to="/login"
          />
        </div>
      </header>
      <div className="flex justify-center">
        <PublicRoutes />
      </div>
    </>
  );
};

export default PublicLayout;
