import { demoPageInitValues } from "./demoPageInitValues";
import { DemoPageStates } from "./demoPageState";
import { generateNewPayment } from "../helper/generateNewPayment";

export type DemoPageAction =
  | { type: "RESET" }
  | { type: "TITLE"; payload: string }
  | {
      type: "PAYMENT";
      payload: {
        paymentID: string;
        from: string;
        to: string;
        amount: number;
      };
    };

export const DemoPageReducer = (
  state: DemoPageStates,
  action: DemoPageAction
): DemoPageStates => {
  switch (action.type) {
    case "RESET": {
      return demoPageInitValues;
    }

    case "PAYMENT": {
      if (action.payload.to === "1") {
        const transaction = state.bill.transaction.find(
          (item) => item.fromUserID === action.payload.from
        );
        if (transaction) {
          transaction.amount += action.payload.amount;
        }
      } else {
        const transaction = state.bill.transaction.find(
          (item) => item.fromUserID === action.payload.to
        );
        if (transaction) {
          transaction.amount -= action.payload.amount;
        }
      }
      return {
        ...state,
        bill: {
          ...state.bill,
          payments: [
            generateNewPayment(
              action.payload.paymentID,
              action.payload.from,
              action.payload.to,
              action.payload.amount
            ),
            ...state.bill.payments,
          ],
        },
      };
    }

    default:
      return { ...state };
  }
};
