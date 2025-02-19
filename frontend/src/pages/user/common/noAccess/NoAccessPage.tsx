import gandalf from "src/assets/You_Shall_Not_Pass.jpg";
import { useNavbarList } from "src/hooks/useNavbarList/useNavbarList";

export const NoAccessPage = () => {
  useNavbarList([]);
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center gap-10">
      <div className="text-3xl font-semibold text-slate-500 select-none text-center">
        You don't have access here
      </div>
      <img className="w-[300px] sm:w-[500px] shadow-lg rounded" src={gandalf} />
    </div>
  );
};
