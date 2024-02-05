import { CSSProperties } from "react";
import { Button, ExpandableBar } from "src/components";
import { ButtonColor } from "src/enums";
import { useUsersHook } from "src/features/users/hook";
import { BillRequest } from "src/types";
import { DateFormatter } from "src/utils/helpers";

interface BillUsersRequestRowProps {
  // userID: string;
  request: BillRequest;
  style: CSSProperties;
  resizeCallback: (height: number) => void;
  onAccept: () => void;
  onReject: () => void;
}

export const BillUsersRequestRow = ({
  request,
  style,
  resizeCallback,
  onAccept,
  onReject,
}: BillUsersRequestRowProps) => {
  const { getUsername } = useUsersHook();
  return (
    <ExpandableBar
      resizeCallback={resizeCallback}
      style={style}
      barElement={
        <div className="w-full flex flex-row justify-between">
          <div className="truncate text-left">
            {getUsername(request.userID)}
          </div>
          <div>{DateFormatter.ddMMyyyy(request.date)}</div>
        </div>
      }
    >
      <div className="flex flex-row justify-around py-3">
        <Button
          className="w-1/3"
          text="Accept"
          color={ButtonColor.GREEN}
          onClick={onAccept}
        />
        <Button
          className="w-1/3"
          text="Reject"
          color={ButtonColor.RED}
          onClick={onReject}
        />
      </div>
    </ExpandableBar>
  );
};
