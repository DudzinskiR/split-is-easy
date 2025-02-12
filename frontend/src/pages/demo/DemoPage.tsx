import { DemoHistoryBox } from "./DemoHistoryBox/DemoHistoryBox";

export const DemoPage = () => {
  return (
    <div className="flex lg:flex-row flex-col w-full justify-between mt-5 gap-5 px-5">
      <DemoHistoryBox />
    </div>
  );
};
