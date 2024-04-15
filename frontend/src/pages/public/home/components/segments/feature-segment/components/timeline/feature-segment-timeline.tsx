import { twJoin, twMerge } from "tailwind-merge";

export type TimelineNode = { subtile: string; description: string };

interface TimelineProps {
  className: string;
  nodes: TimelineNode[];
  lineWidth?: number;
  align: "LEFT" | "RIGHT";
}

export const FeatureSegmentTimeline = ({
  nodes,
  className,
  lineWidth = 2,
  align,
}: TimelineProps) => {
  const renderNode = (key: number, node: TimelineNode) => {
    return (
      <div key={key} className="relative w-[300px] top-[-20px]">
        <div className="absolute translate-y-2">
          <div className="absolute size-[15px] bg-indigo-500 border-4 border-white rounded-full absolute-center-x"></div>
        </div>
        <div
          className={twJoin(
            "absolute mx-5 lg:w-[300px] w-[250px]",
            align === "LEFT"
              ? "text-left"
              : "text-right lg:left-[-350px] left-[-290px]"
          )}
        >
          <div className="text-2xl w-full text-white font-semibold float-start block">
            {node.subtile}
          </div>
          <div className="text-md text-white w-full float-end block">
            {node.description}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={twMerge("absolute h-full w-full", className)}>
      <div
        className="absolute h-[500px] bg-white flex flex-col justify-around"
        style={{ width: lineWidth }}
      >
        {nodes.map((item, index) => renderNode(index, item))}
      </div>
    </div>
  );
};
