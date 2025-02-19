import { useEffect, useReducer, useState } from "react";
import { DemoHistoryBox } from "./components/DemoHistoryBox/DemoHistoryBox";
import { DemoPageReducer } from "./reducer/DemoPageReducer";
import { demoPageInitValues } from "./reducer/demoPageInitValues";
import DemoPageContextProvider from "./context/DemoPageContext";
import { DemoSummaryBox } from "./components/DemoSummaryBox/DemoSummaryBox";
import { DemoNavbar } from "./components/DemoNavbar/DemoNavbar";
import { DemoLoginModal } from "src/components/modal/modals/DemoLoginModal/DemoLoginModal";

let counter = 5;
type DemoPaymentsData = {
  amount: number;
  counter: number;
};

const demoUsersID = ["2", "3", "4", "5", "6"];

const demoUserPayments: Record<string, DemoPaymentsData> = demoUsersID.reduce<
  Record<string, DemoPaymentsData>
>((acc, key) => {
  acc[key] = { amount: 0, counter: 0 };
  return acc;
}, {});

export const DemoPage = () => {
  const [state, dispatch] = useReducer(DemoPageReducer, demoPageInitValues);
  const [isOpenModal, setOpenModal] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser =
        demoUsersID[Math.floor(Math.random() * demoUsersID.length)];
      const randomAmount = Math.random() * 7000 + 300;
      if (demoUserPayments[randomUser].counter > 3) {
        dispatch({
          type: "PAYMENT",
          payload: {
            paymentID: `${counter}`,
            from: "1",
            to: randomUser,
            amount: demoUserPayments[randomUser].amount,
          },
        });
        demoUserPayments[randomUser].counter = 0;
        demoUserPayments[randomUser].amount = 0;
      } else {
        dispatch({
          type: "PAYMENT",
          payload: {
            paymentID: `${counter}`,
            from: randomUser,
            to: "1",
            amount: randomAmount,
          },
        });
        demoUserPayments[randomUser].amount += randomAmount;
      }
      demoUserPayments[randomUser].counter++;
      counter++;
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-screen flex flex-col items-center">
      <DemoPageContextProvider
        state={state}
        dispatch={dispatch}
        openLoginModal={() => setOpenModal(true)}
      >
        <DemoNavbar />
        <div className="w-full container">
          <div className="flex lg:flex-row flex-col w-full justify-between mt-5 gap-5 px-5">
            <DemoSummaryBox />
            <DemoHistoryBox />
          </div>
        </div>
      </DemoPageContextProvider>
      <DemoLoginModal
        isOpen={isOpenModal}
        onRejected={() => setOpenModal(false)}
      />
    </div>
  );
};
