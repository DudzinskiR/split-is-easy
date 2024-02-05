import { CSSProperties, ReactNode } from "react";
import { useNewPaymentContext } from "../../hook/new-payment.hook";
import { VirtualList } from "src/components";

interface NewPaymentSplitterListProps {
  rowElement: (index: number, style: CSSProperties) => ReactNode;
}

export const NewPaymentSplitterList = ({
  rowElement,
}: NewPaymentSplitterListProps) => {
  const { state } = useNewPaymentContext();
  const rowHeight = 50;
  return (
    <VirtualList
      rowElement={rowElement}
      height={Math.min(rowHeight * state.participants.length, 200)}
      itemCount={state.participants.length}
      itemHeight={50}
    />
  );
};
