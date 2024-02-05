import { TransactionBetweenUsers, UserBalance } from "src/types";
import { ObjectId } from "mongodb";
import { PaymentDocument } from "src/interfaces";
export class PaymentCalculator {
  private payments: PaymentDocument[] = [];
  private users: string[] = [];
  private costs: { [key: string]: number } = {};
  private balance: { [key: string]: number } = {};
  private sumPayments: { [key: string]: number } = {};
  private participants: UserBalance[] = [];
  private transactions: TransactionBetweenUsers[] = [];

  constructor(users: string[], payments: PaymentDocument[]) {
    this.payments = payments;
    this.users = users;

    this.calc();
  }

  public getTransactions(): TransactionBetweenUsers[] {
    return [...this.transactions];
  }

  public getBalance() {
    return Object.entries(this.balance).map<UserBalance>(([userID, value]) => ({
      userID: new ObjectId(userID),
      value,
    }));
  }

  private calc() {
    if (!this.payments) return;

    this.calcCosts();
    this.calcSumPayments();

    this.calcBalance();

    this.calcParticipants();

    this.participants.sort((a, b) => a.value - b.value);

    this.calcTransactions();
  }

  private calcCosts() {
    for (const payment of this.payments) {
      for (const person of payment.participants) {
        const personID = person.userID.toString();
        if (this.costs[personID]) {
          this.costs[personID] += person.value;
        } else {
          this.costs[personID] = person.value;
        }
      }
    }
  }

  private calcSumPayments() {
    for (const payment of this.payments) {
      const paidBy = payment.paidBy.toString();
      const amount = payment.participants.reduce<number>(
        (prev, curr) => (prev += curr.value),
        0
      );

      if (this.sumPayments[paidBy]) {
        this.sumPayments[paidBy] += amount;
      } else {
        this.sumPayments[paidBy] = amount;
      }
    }

    return this.sumPayments;
  }

  private calcBalance() {
    for (const user of this.users) {
      this.balance[user] =
        (this.sumPayments[user] || 0) - (this.costs[user] || 0);
    }
  }

  private calcParticipants() {
    for (const user of this.users) {
      this.participants.push({
        userID: new ObjectId(user),
        value: this.balance[user],
      });
    }
  }

  private calcTransactions() {
    const tempParticipants = [...this.participants];

    while (tempParticipants.length !== 0) {
      const left = tempParticipants[0];
      const leftAbsBalance = Math.abs(left.value);

      const right = tempParticipants[tempParticipants.length - 1];
      const rightAbsBalance = Math.abs(right.value);

      if (left === right) break;

      if (leftAbsBalance < rightAbsBalance) {
        this.leftIsSmaller(tempParticipants, this.transactions, left, right);
      } else if (leftAbsBalance > rightAbsBalance) {
        this.leftIsBigger(tempParticipants, this.transactions, left, right);
      } else {
        this.leftIsEqual(tempParticipants, this.transactions, left, right);
      }
    }
  }

  private leftIsSmaller(
    participants: UserBalance[],
    transactions: TransactionBetweenUsers[],
    left: UserBalance,
    right: UserBalance
  ) {
    if (Math.abs(left.value) > 1) {
      participants[participants.length - 1].value += left.value;

      transactions.push({
        fromUserID: left.userID,
        toUserID: right.userID,
        amount: Math.abs(left.value),
      });
    }
    participants.splice(0, 1);
  }

  private leftIsBigger(
    participants: UserBalance[],
    transactions: TransactionBetweenUsers[],
    left: UserBalance,
    right: UserBalance
  ) {
    if (Math.abs(right.value) > 1) {
      participants[0].value += right.value;

      transactions.push({
        fromUserID: left.userID,
        toUserID: right.userID,
        amount: Math.abs(right.value),
      });
    }

    participants.splice(participants.length - 1, 1);
  }

  private leftIsEqual(
    participants: UserBalance[],
    transactions: TransactionBetweenUsers[],
    left: UserBalance,
    right: UserBalance
  ) {
    if (Math.abs(left.value) > 1) {
      transactions.push({
        fromUserID: left.userID,
        toUserID: right.userID,
        amount: Math.abs(left.value),
      });
    }
    participants.splice(participants.length - 1, 1);
    participants.splice(0, 1);
  }
}
