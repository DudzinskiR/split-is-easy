import { Button } from "src/components/button/button.component";
import { ButtonColor } from "src/enums/button-color/button-color";

interface BillUsersListVirtualButtonsProps {
  mergeUser: () => void;
  removeUser: () => void;
}

export const BillUsersListVirtualButtons = ({
  mergeUser,
  removeUser,
}: BillUsersListVirtualButtonsProps) => {
  return (
    <div className="flex flex-row justify-around">
      <Button
        className="w-1/3"
        text="Merge"
        color={ButtonColor.PURPLE}
        onClick={mergeUser}
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
