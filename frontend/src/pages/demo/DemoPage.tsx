import { useEffect, useReducer } from "react";
import { DemoHistoryBox } from "./components/DemoHistoryBox/DemoHistoryBox";
import { DemoPageReducer } from "./reducer/DemoPageReducer";
import { demoPageInitValues } from "./reducer/demoPageInitValues";
import DemoPageContextProvider from "./context/DemoPageContext";
import { DemoSummaryBox } from "./components/DemoSummaryBox/DemoSummaryBox";

export const DemoPage = () => {
  const [state, dispatch] = useReducer(DemoPageReducer, demoPageInitValues);

  useEffect(() => {
    const interval = setInterval(() => {}, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full container h-screen">
      <div className="flex lg:flex-row flex-col w-full justify-between mt-5 gap-5 px-5">
        <DemoPageContextProvider state={state} dispatch={dispatch}>
          <DemoSummaryBox />
          <DemoHistoryBox />
        </DemoPageContextProvider>
      </div>
    </div>
  );
};
