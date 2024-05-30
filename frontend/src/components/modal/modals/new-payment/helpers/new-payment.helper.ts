import { UserSplitInfo } from "src/types/user/user-split-info.type";
import { checkIsWithinErrorMargin } from "src/utils/helpers/check-is-within-error-margin/check-is-within-error-margin";

import { NewPaymentState } from "../interface/new-payment.interface";

export const splitAmount = (userSplitInfo: UserSplitInfo, amount: string) => {
  const userWithAutoMode = Object.entries(userSplitInfo)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, info]) => info.auto)
    .map(([key, info]) => ({ key, info }));

  const userWithoutAutoMode = Object.entries(userSplitInfo)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, info]) => !info.auto)
    .map(([key, info]) => ({ key, info }));

  const splitValue = userWithoutAutoMode.reduce<number>(
    (sum, { info }) => sum + (parseFloat(info.value) || 0),
    0
  );

  const updatedUserSplitInfo: UserSplitInfo = {};
  userWithAutoMode.forEach(({ key, info }) => {
    updatedUserSplitInfo[key] = {
      value: Math.max(
        ((parseFloat(amount) || 0) - splitValue) / userWithAutoMode.length,
        0
      ).toString(),
      auto: info.auto,
    };
  });

  userWithoutAutoMode.forEach(({ key, info }) => {
    updatedUserSplitInfo[key] = info;
  });

  return updatedUserSplitInfo;
};

export const sumValues = (userSplitInfo: UserSplitInfo) => {
  const values = Object.values(userSplitInfo).map((item) => item.value);
  const sum = values.reduce<number>((sum, curr) => sum + parseFloat(curr), 0);
  return sum;
};

export const validateNewPayment = (state: NewPaymentState) => {
  if (state.paymentTitle.trim().length < 3) return false;
  if (state.amount.length === 0) return false;
  if (state.paidBy === undefined) return false;
  if (state.participants.length <= 0) return false;
  if (state.splitType === "AMOUNT") {
    const sumValue = sumValues(state.values);
    const amount = parseFloat(state.amount);
    if (!checkIsWithinErrorMargin(sumValue, amount, 2)) {
      return false;
    }
  }
  return true;
};

export const preparePaymentToSend = (
  state: NewPaymentState,
  decimalDigitsOfCurrency: number
) => {
  const commonDataToSend = {
    title: state.paymentTitle,
    splitType: state.splitType,
    paidBy: state.paidBy,
    amount: convertStringToValue(state.amount, decimalDigitsOfCurrency),
    billID: state.billID,
    currency: state.currencyCode,
  };
  switch (state.splitType) {
    case "EQUAL": {
      const participantsList = [];
      for (const [key] of Object.entries(state.values)) {
        participantsList.push({
          userID: key,
          auto: true,
          value: convertStringToValue(
            (parseFloat(state.amount) / state.participants.length).toString(),
            decimalDigitsOfCurrency
          ),
        });
      }
      return { ...commonDataToSend, participants: participantsList };
    }
    case "AMOUNT": {
      const participantsList = [];
      for (const [key, value] of Object.entries(state.values)) {
        participantsList.push({
          userID: key,
          auto: value.auto,
          value: convertStringToValue(value.value, decimalDigitsOfCurrency),
        });
      }
      return { ...commonDataToSend, participants: participantsList };
    }
  }
};

const convertStringToValue = (
  value: string,
  decimalDigitsOfCurrency: number
) => {
  const floatValue = parseFloat(value);
  const intValue = Math.round(floatValue * 10 ** decimalDigitsOfCurrency);

  return intValue;
};
