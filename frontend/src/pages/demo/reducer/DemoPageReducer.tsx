import { demoPageInitValues } from "./demoPageInitValues";
import { DemoPageStates } from "./demoPageState";

export type DemoPageAction =
  | { type: "RESET" }
  | { type: "TITLE"; payload: string };

export const DemoPageReducer = (
  state: DemoPageStates,
  action: DemoPageAction
): DemoPageStates => {
  switch (action.type) {
    case "RESET": {
      return demoPageInitValues;
    }

    // case "TITLE":
    //   return { ...state, paymentTitle: action.payload };

    default:
      return { ...state };
  }
};
