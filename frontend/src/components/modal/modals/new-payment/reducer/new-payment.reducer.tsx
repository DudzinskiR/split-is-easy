import { SplitType } from "src/enums/split-type/split-type";
import { UserSplitInfo } from "src/types/user/user-split-info.type";

import { newPaymentInitValues } from "../const/new-payment-init-value";
import { NewPaymentState } from "../interface/new-payment.interface";

export type NewPaymentAction =
  | { type: "RESET" }
  | { type: "TITLE"; payload: string }
  | { type: "PARTICIPANTS"; payload: string[] }
  | { type: "PAID_BY"; payload: string | undefined }
  | { type: "AMOUNT"; payload: string }
  | { type: "CURRENCY"; payload: string }
  | { type: "SPLIT_TYPE"; payload: SplitType }
  | { type: "UPDATE_USER_VALUES" }
  | { type: "RESET_VALUE" }
  | {
      type: "SET_USERS";
      payload: {
        paidBy: string;
        participants: string[];
      };
    }
  | { type: "SET_VALUES"; payload: UserSplitInfo }
  | { type: "SET_BILL_ID"; payload: string }
  | {
      type: "CHANGE_AUTO_MODE";
      payload: {
        userID: string;
        value: boolean;
      };
    }
  | {
      type: "CHANGE_VALUE";
      payload: {
        userID: string;
        value: string;
      };
    };

export const NewPaymentReducer = (
  state: NewPaymentState,
  action: NewPaymentAction
): NewPaymentState => {
  switch (action.type) {
    case "RESET": {
      return newPaymentInitValues;
    }
    case "SET_USERS":
      return {
        ...state,
        paidBy: action.payload.paidBy,
        participants: action.payload.participants,
      };

    case "CHANGE_AUTO_MODE": {
      const newValues = { ...state.values };

      if (newValues[action.payload.userID]) {
        newValues[action.payload.userID].auto = action.payload.value;
      }

      return { ...state, values: newValues };
    }

    case "CHANGE_VALUE": {
      const newValues = { ...state.values };
      if (newValues[action.payload.userID]) {
        newValues[action.payload.userID] = {
          value: action.payload.value,
          auto: false,
        };
      }
      return { ...state, values: newValues };
    }

    case "UPDATE_USER_VALUES": {
      const newValues: UserSplitInfo = {};
      for (const item of state.participants) {
        if (state.values[item]) {
          newValues[item] = { ...state.values[item] };
        } else {
          newValues[item] = { value: "0", auto: true };
        }
      }
      return { ...state, values: newValues };
    }

    case "SET_VALUES":
      return { ...state, values: action.payload };

    case "RESET_VALUE": {
      const newValues: UserSplitInfo = {};
      for (const item of state.participants) {
        newValues[item] = { value: "0", auto: true };
      }
      return { ...state, values: newValues };
    }

    case "TITLE":
      return { ...state, paymentTitle: action.payload };

    case "PARTICIPANTS":
      return { ...state, participants: action.payload };

    case "PAID_BY":
      return { ...state, paidBy: action.payload };

    case "AMOUNT":
      return { ...state, amount: action.payload };

    case "SPLIT_TYPE":
      return { ...state, splitType: action.payload };

    case "CURRENCY": {
      return { ...state, currencyCode: action.payload };
    }

    case "SET_BILL_ID": {
      return { ...state, billID: action.payload };
    }

    default:
      return { ...state };
  }
};
