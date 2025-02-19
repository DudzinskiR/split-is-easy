import { generateNewPayment } from "../helper/generateNewPayment";
import { DemoPageStates } from "./demoPageState";

const paymentAmounts = [
  Math.random() * 10000 + 1000,
  Math.random() * 10000 + 1000,
  Math.random() * 10000 + 1000,
  Math.random() * 10000 + 1000,
  Math.random() * 10000 + 1000,
];

export const demoPageInitValues: DemoPageStates = {
  username: {
    "1": "You",
    "2": "Emma",
    "3": "Charlotte",
    "4": "James",
    "5": "Oliver",
    "6": "Sophia",
  },
  currency: {
    symbol: "$",
    name: "US Dollar",
    code: "USD",
    decimalDigits: 2,
    rounding: 0,
  },
  bill: {
    id: "DEMO",
    currency: "USD",
    users: [
      {
        id: "1",
        username: "You",
        type: "ADMIN",
      },
      {
        id: "2",
        username: "Emma",
        type: "NORMAL",
      },
      {
        id: "3",
        username: "Charlotte",
        type: "NORMAL",
      },
      {
        id: "4",
        username: "James",
        type: "NORMAL",
      },
      {
        id: "5",
        username: "Oliver",
        type: "NORMAL",
      },
      {
        id: "6",
        username: "Sophia",
        type: "NORMAL",
      },
    ],
    admins: [],
    admin: {
      invitationCode: "",
      requireAccept: false,
      requests: [],
    },
    payments: [
      generateNewPayment("4", "1", "2", paymentAmounts[0]),
      generateNewPayment("3", "1", "3", paymentAmounts[1]),
      generateNewPayment("2", "1", "4", paymentAmounts[2]),
      generateNewPayment("1", "1", "5", paymentAmounts[3]),
      generateNewPayment("0", "1", "6", paymentAmounts[4]),
    ],
    usersBalance: [
      {
        userID: "1",
        value: 100,
      },
    ],
    transaction: [
      {
        fromUserID: "2",
        toUserID: "1",
        amount: paymentAmounts[0],
      },
      {
        fromUserID: "3",
        toUserID: "1",
        amount: paymentAmounts[1],
      },
      {
        fromUserID: "4",
        toUserID: "1",
        amount: paymentAmounts[2],
      },
      {
        fromUserID: "5",
        toUserID: "1",
        amount: paymentAmounts[3],
      },
      {
        fromUserID: "6",
        toUserID: "1",
        amount: paymentAmounts[4],
      },
    ],
    name: "DEMO",
  },
};
