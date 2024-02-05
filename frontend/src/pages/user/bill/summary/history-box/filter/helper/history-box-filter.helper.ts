import { BillPayment } from "src/types";

export const filterPayments =
  (...callbacks: ((payment: BillPayment[]) => BillPayment[])[]) =>
  (payments: BillPayment[]) => {
    let newPaymentsList = [...payments];
    for (const fn of callbacks) {
      newPaymentsList = fn(newPaymentsList);
    }

    return newPaymentsList;
  };

export const filterByTitle = (title: string) => (payments: BillPayment[]) => {
  return payments.filter((item) =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );
};

export const filterByPayers =
  (payers: string[]) => (payments: BillPayment[]) => {
    return payments.filter((item) => payers.includes(item.paidBy));
  };

export const filterByRecipients =
  (recipients: string[]) => (payments: BillPayment[]) => {
    return payments.filter((payment) => {
      return payment.participants.some((participant) =>
        recipients.includes(participant.userID)
      );
    });
  };

export const filterByAmount =
  (min: number, max: number, decimalPlaces: number) =>
  (payments: BillPayment[]) => {
    const minValue = min || 0;
    const maxValue = max || Infinity;
    return payments.filter(
      (payment) =>
        payment.amount >= minValue * 10 ** decimalPlaces &&
        payment.amount <= maxValue * 10 ** decimalPlaces
    );
  };
