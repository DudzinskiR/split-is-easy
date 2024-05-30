import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "src/components/box/box.component";
import { useAccountHook } from "src/features/account/hook/account.hook";
import { API } from "src/utils/api/api";
import { InvitationJoinPossible } from "./box/join-possible/join-possible.component";
import { InvitationPendingApproval } from "./box/pending-approval/pending-approval.component";
import { InvitationRequestPossible } from "./box/request-possible/request-possible.component";
import { RequestStatus } from "src/types/invitation/request-status";

const InvitationPage = () => {
  const [invitation, setInvitation] = useState<RequestStatus>({
    status: "IDLE",
  });
  const { invID } = useParams();
  const navigate = useNavigate();
  const billIDRef = useRef<string | null>(null);
  const { getBillsList } = useAccountHook();

  useEffect(() => {
    for (const item of getBillsList()) {
      if (item.billID === billIDRef.current) {
        navigate(`/bill/${item.billID}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBillsList()]);

  useEffect(() => {
    const fetchInvitation = async () => {
      const result = await API.get<RequestStatus>(`/inv/${invID}`);
      if (!result) return;
      if (result.status !== "IDLE") {
        billIDRef.current = result.billID;
      }

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
