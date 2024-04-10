import { ReactNode } from "react";
import {
  PublicHomeCarousel,
  PublicHomeFAQSegment,
  PublicHomeFooterSegment,
  PublicHomeForGroupSegment,
  PublicHomeStatisticSegment,
  PublicHomeTitleSegment,
} from "./components/segments";

import { PublicHomeSegmentTemplate } from "./components/segment-template/public-home-segment-template.component";
import TestComponent from "./components/segments/test-component/test-component.component";

const segments: { component: ReactNode; fullScreen?: boolean }[] = [
  { component: <TestComponent />, fullScreen: true },
  { component: <PublicHomeTitleSegment /> },
  { component: <PublicHomeCarousel />, fullScreen: true },
  { component: <PublicHomeForGroupSegment /> },
  { component: <PublicHomeStatisticSegment />, fullScreen: true },
  { component: <PublicHomeFAQSegment /> },
  { component: <PublicHomeFooterSegment /> },
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
