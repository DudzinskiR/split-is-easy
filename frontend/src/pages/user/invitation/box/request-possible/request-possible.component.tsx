import { useAPI } from "src/hooks";
import { InvitationBoxTemplate } from "../template";

interface InvitationRequestPossibleProps {
  invitationCode: string;
  billName: string;
  onClick: () => void;
}

export const InvitationRequestPossible = ({
  invitationCode,
  billName,
  onClick,
}: InvitationRequestPossibleProps) => {
  const { post } = useAPI();

  const onClickHandler = () => {
    post({
      url: `inv/${invitationCode}`,
      onSuccess: onClick,
    });
  };

  return (
    <InvitationBoxTemplate
      title={"You have received an invitation to bill"}
      billName={billName}
      sideText={"Requires additional approval by bill administrator"}
      button={{ text: "Send request", onClick: onClickHandler }}
    />
  );
};
