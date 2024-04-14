import { ReactNode } from "react";

import { PublicHomeSegmentTemplate } from "./components/segment-template/public-home-segment-template.component";
import { MainSegment } from "./components/segments";

const segments: { component: ReactNode; fullScreen?: boolean }[] = [
  { component: <MainSegment />, fullScreen: true },
  { component: <div className="h-[100px]"></div> },
];

const PublicHomePage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* <TestComponent /> */}
      {segments.map((item, index) => (
        <PublicHomeSegmentTemplate
          whiteBackground={index % 2 == 0}
          key={index}
          fullScreen={item.fullScreen}
        >
          {item.component}
        </PublicHomeSegmentTemplate>
      ))}
    </div>
  );
};

export default PublicHomePage;
