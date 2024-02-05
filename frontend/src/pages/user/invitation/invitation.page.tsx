import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RequestStatus } from "src/types";
import { API } from "src/utils/api";
import { Box } from "src/components";
import {
  InvitationJoinPossible,
  InvitationPendingApproval,
  InvitationRequestPossible,
} from "./box";

const InvitationPage = () => {
  const [invitation, setInvitation] = useState<RequestStatus>({
    status: "IDLE",
  });
  const { invID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvitation = async () => {
      const result = await API.get<RequestStatus>(`/inv/${invID}`);

      if (!result) return;

      if (result.status === "JOINED") {
        navigate(`/bill/${result.billID}`);
      }

      setInvitation(result);
    };

    fetchInvitation();
  }, [invID, navigate]);

  const renderInsideBox = () => {
    switch (invitation.status) {
      case "PENDING_APPROVAL":
        return (
          <InvitationPendingApproval
            billName={invitation.billName}
            billID={invitation.billID}
            onClick={() => {
              navigate(`/`);
            }}
          />
        );
      case "REQUEST_POSSIBLE":
        return (
          <InvitationRequestPossible
            billName={invitation.billName}
            invitationCode={invID!}
            onClick={() => {
              setInvitation({ ...invitation, status: "PENDING_APPROVAL" });
            }}
          />
        );
      case "JOIN_POSSIBLE":
        return (
          <InvitationJoinPossible
            billName={invitation.billName}
            invCode={invID!}
          />
        );
      case "JOINED":
      case "IDLE":
        return (
          <div className="h-10 w-full text-2xl flex justify-center items-center pb-3">
            Loading...
          </div>
        );
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <Box title="Invitation" className="lg:w-1/2 w-full">
        {renderInsideBox()}
      </Box>
    </div>
  );
};

export default InvitationPage;
