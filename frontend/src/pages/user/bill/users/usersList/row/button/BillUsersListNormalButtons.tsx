import { Button } from "src/components/Button/Button";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";

interface BillUsersListNormalButtonsProps {
  setUserAsAdmin: () => void;
  removeUser: () => void;
}

export const BillUsersListNormalButtons = ({
  setUserAsAdmin,
  removeUser,
}: BillUsersListNormalButtonsProps) => {
  return (
    <div className="flex flex-row justify-around">
      <Button
        className="w-1/3"
        text="Set as Admin"
        color={ButtonColor.PURPLE}
        onClick={setUserAsAdmin}
      />
      <Button
        className="w-1/3"
        text="Remove"
        color={ButtonColor.RED}
        onClick={removeUser}
      />
    </div>
  );
};
