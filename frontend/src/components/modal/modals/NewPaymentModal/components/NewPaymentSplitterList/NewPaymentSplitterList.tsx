import { CSSProperties, ReactNode } from "react";
import { useNewPaymentContext } from "../../hook/useNewPaymentContext";
import { VirtualList } from "src/components/VirtualList/VirtualList";

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
