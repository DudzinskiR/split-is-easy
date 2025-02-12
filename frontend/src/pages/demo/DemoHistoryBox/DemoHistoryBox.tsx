import { Box } from "src/components/Box/Box";
import { HistoryBoxFilter } from "src/pages/user/bill/summary/HistoryBox/filter/HistoryBoxFilter";
import HistoryBoxList from "src/pages/user/bill/summary/HistoryBox/list/HistoryBoxList";

export const DemoHistoryBox = () => {
  return (
    <Box title="History" className="relative pb-2 flex flex-col">
      <HistoryBoxFilter payments={[]} users={[]} onChange={() => {}} />
      <HistoryBoxList
        payments={[
          {
            id: "1",
            title: "qwe",
            amount: 123,
            paidBy: "qwe",
            splitType: "EQUAL",
            billID: "DEMO",
            participants: [],
            createdAt: "qwe",
          },
        ]}
      />
    </Box>
  );
};
