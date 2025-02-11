import { Button } from "src/components/Button/Button";
import { ButtonColor } from "src/enums/ButtonColor/ButtonColor";

interface BillUsersListAdminButtonsProps {
  setUserAsUser: () => void;
  removeUser: () => void;
}

export const BillUsersListAdminButtons = ({
  setUserAsUser,
  removeUser,
}: BillUsersListAdminButtonsProps) => {
  return (
    <div className="flex flex-row justify-around">
      <Button
        className="w-1/3"
        text="Set as user"
        color={ButtonColor.PURPLE}
        onClick={setUserAsUser}
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
