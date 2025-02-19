import { CSSProperties, useEffect } from "react";
import { ExpandableBar } from "src/components/ExpandableBar/ExpandableBar";
import { useAccountHook } from "src/features/account/hook/useAccountHook";
import { useUsersHook } from "src/features/users/hook/useUsersHook";
import { useCurrencyFormatter } from "src/hooks/useCurrencyFormatter/useCurrencyFormatter";
import { Bill } from "src/types/bill/Bill";
import { UserBalance } from "src/types/bill/UserBalance";
import { User } from "src/types/user/User";

import { BillUsersListAdminButtons } from "./button/BillUsersListAdminButtons";
import { BillUsersListNormalButtons } from "./button/BillUsersListNormalButtons";
import { BillUsersListVirtualButtons } from "./button/BillUsersListVirtualButtons";

interface BillUsersListRowProps {
  billData: Bill;
  style: CSSProperties;
  isAdmin: boolean;
  user: User;
  userBalance: UserBalance | undefined;
  resizeCallback: (height: number) => void;
  removeUser: (user: User) => void;
  setUserAsAdmin: (user: User) => void;
  setUserAsUser: (user: User) => void;
  mergeVirtualUser: (user: User) => void;
}

type BalanceDataToRender = {
  userID: string;
  value: number;
};

const BillUsersListRow = ({
  billData,
  style,
  isAdmin,
  user,
  userBalance,
  setUserAsUser,
  resizeCallback,
  removeUser,
  setUserAsAdmin,
  mergeVirtualUser,
}: BillUsersListRowProps) => {
  const { getUsername } = useUsersHook();
  const { currencyWithFormat, currencyWithoutFormat, setCurrencyCode } =
    useCurrencyFormatter();

  const { getAccountID } = useAccountHook();

  useEffect(() => {
    if (!billData) return;
    setCurrencyCode(billData.currency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billData]);

  if (!billData) return <></>;

  const renderButtons = (user: User) => {
    if (!isAdmin) return <></>;
    if (user.id === getAccountID()) return <></>;

    switch (user.type) {
      case "NORMAL":
        return (
          <BillUsersListNormalButtons
            setUserAsAdmin={() => {
              setUserAsAdmin(user);
            }}
            removeUser={() => {
              removeUser(user);
            }}
          />
        );
      case "ADMIN":
        return (
          <BillUsersListAdminButtons
            removeUser={() => {
              removeUser(user);
            }}
            setUserAsUser={() => setUserAsUser(user)}
          />
        );
      case "VIRTUAL":
        return (
          <BillUsersListVirtualButtons
            mergeUser={() => {
              mergeVirtualUser(user);
            }}
            removeUser={() => {
              removeUser(user);
            }}
          />
        );
    }
  };
  const renderBalance = () => {
    const balance = userBalance;
    if (!balance) return <></>;
    if (balance.value > 0) {
      const listToRender: BalanceDataToRender[] = [];

      for (const transaction of billData.transaction) {
        if (transaction.toUserID === user.id) {
          listToRender.push({
            userID: transaction.fromUserID,
            value: transaction.amount,
          });
        }
      }
      return (
        <div>
          Balance:
          {renderBalanceList(listToRender)}
        </div>
      );
    } else if (balance.value < 0) {
      const listToRender: BalanceDataToRender[] = [];

      for (const transaction of billData.transaction) {
        if (transaction.fromUserID === user.id) {
          listToRender.push({
            userID: transaction.toUserID,
            value: transaction.amount,
          });
        }
      }
      return (
        <div>
          Balance:
          {renderBalanceList(listToRender)}
        </div>
      );
    } else {
      return <div>ok</div>;
    }
  };

  const renderBalanceList = (data: BalanceDataToRender[]) => {
    return data.map((item) => (
      <div
        key={item.userID}
        className="flex flex-row justify-between px-5 text-lg"
      >
        <div className="truncate">{getUsername(item.userID)}</div>
        <div>{currencyWithoutFormat(item.value)}</div>
      </div>
    ));
  };

  return (
    <ExpandableBar
      className="px-3"
      barElement={
        <div className="flex flex-row justify-between w-full">
          <div className="truncate">{user && getUsername(user.id)}</div>
          <div className="flex flex-row items-center">
            <div className="mr-2 text-sm text-slate-800 italic">
              {user.type === "ADMIN" ? "(Admin)" : ""}
              {user.type === "VIRTUAL" ? "(Virtual)" : ""}
            </div>
            {userBalance && currencyWithFormat(userBalance.value)}
          </div>
        </div>
      }
      style={style}
      resizeCallback={resizeCallback}
    >
      <div className="flex flex-col gap-5 p-3 ">
        {renderBalance()}
        {renderButtons(user)}
      </div>
    </ExpandableBar>
  );
};

export default BillUsersListRow;
