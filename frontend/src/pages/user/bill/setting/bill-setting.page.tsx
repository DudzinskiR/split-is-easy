import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "src/components";
import { InputText } from "src/components/inputs";
import { ConfirmModal } from "src/components/modal";
import { ButtonColor } from "src/enums";
import { useAccountHook, useBillsHook } from "src/features";
import {
  useAPI,
  useDocumentTitle,
  useNavbarList,
  useVisibilityToggle,
} from "src/hooks";
import { billPageNavbarData } from "src/utils/navbar-list";
import { isValidBillName } from "src/utils/validators";

export const BillSettingPage = () => {
  const { billID } = useParams();
  const [billName, setBillName] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  useNavbarList(billPageNavbarData, 3, { key: ":billID", value: billID! });
  const { getBillData } = useBillsHook();
  const { getAccountID } = useAccountHook();
  const changeBillNameModal = useVisibilityToggle();
  const leaveBillModal = useVisibilityToggle();
  const { del, put } = useAPI();
  const navigate = useNavigate();

  useDocumentTitle(`${getBillData(billID)?.name || "loading"} - setting`, [
    getBillData(billID),
  ]);

  useEffect(() => {
    setBillName(getBillData(billID)?.name || "");
    setAdmin(
      !!getBillData(billID)?.admins.find((item) => item === getAccountID())
    );
  }, [billID, getAccountID, getBillData]);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-center items-center flex-col mt-5 gap-5 px-5">
          <Box
            title="Setting"
            className="w-full md:w-1/2 pb-5 flex flex-col gap-5"
          >
            {isAdmin && (
              <div className="flex flex-col items-center gap-5 md:flex-row justify-around">
                <div className="w-72">
                  <InputText
                    label="Bill name"
                    value={billName}
                    onChange={(event) => {
                      setBillName(event.target.value);
                    }}
                    error={!isValidBillName(billName) && billName.length > 0}
                  />
                </div>
                <Button
                  className="w-32"
                  text="Save"
                  color={ButtonColor.PURPLE}
                  onClick={() => changeBillNameModal.setOpen(true)}
                  disabled={!isValidBillName(billName)}
                />
              </div>
            )}
            <div className="flex justify-center">
              <Button
                className="w-32"
                color={ButtonColor.RED}
                text="Leave bill"
                onClick={() => leaveBillModal.setOpen(true)}
              />
            </div>
          </Box>
        </div>
      </div>
      <ConfirmModal
        isOpen={changeBillNameModal.isOpen}
        onRejected={() => changeBillNameModal.setOpen(false)}
        data={{
          title: "Are you sure?",
          description: (
            <div>
              Are you sure you want to change the bill name from
              <span className="font-semibold">
                {" "}
                {getBillData(billID)?.name}{" "}
              </span>
              to <span className="font-semibold"> {billName} </span>
            </div>
          ),
        }}
        onSuccess={() => {
          put({
            url: `/bill/${billID}/admin/name`,
            body: { billName: billName },
            onFinally: () => {
              changeBillNameModal.setOpen(false);
            },
          });
        }}
      />
      <ConfirmModal
        isOpen={leaveBillModal.isOpen}
        onRejected={() => leaveBillModal.setOpen(false)}
        data={{
          title: "Are you sure?",
          description: (
            <div>
              Leaving the account will result in automatic processing of any
              outstanding payments
            </div>
          ),
        }}
        onSuccess={() => {
          del({
            url: `/bill/${billID}/leave`,
            onSuccess: () => {
              navigate("/");
            },
          });
        }}
      />
    </>
  );
};
