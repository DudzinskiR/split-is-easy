import { useNavigate } from "react-router-dom";
import { useAPI } from "src/hooks/useAPI/useAPI";

import { InvitationBoxTemplate } from "../InvitationBoxTemplate/InvitationBoxTemplate";

interface InvitationJoinPossibleProps {
  billName: string;
  invCode: string;
}

export const InvitationJoinPossible = ({
  billName,
  invCode,
}: InvitationJoinPossibleProps) => {
  const { post } = useAPI();
  const navigate = useNavigate();
  return (
    <InvitationBoxTemplate
      title={"You have received an invitation to bill"}
      billName={billName}
      sideText={"Do you want to join the bill?"}
      button={{
        text: "Accept",
        onClick: () => {
          post({
            url: `inv/${invCode}/accept`,
            onSuccess: (result: { billID: string }) => {
              navigate(`/bill/${result.billID}`);
            },
          });
        },
      }}
    />
  );
};
