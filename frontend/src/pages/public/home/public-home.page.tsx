import { ReactNode } from "react";
import {
  PublicHomeFAQSegment,
  PublicHomeFooterSegment,
  PublicHomeForGroupSegment,
  PublicHomeStatisticSegment,
  PublicHomeTitleSegment,
} from "./components/segments";

import { PublicHomeSegmentTemplate } from "./components/segment-template/public-home-segment-template.component";

const segments: ReactNode[] = [
  <PublicHomeTitleSegment />,
  <PublicHomeStatisticSegment />,
  <PublicHomeForGroupSegment />,
  <PublicHomeFAQSegment />,
  <PublicHomeFooterSegment />,
];

const PublicHomePage = () => {
  return (
    <div className="flex flex-col w-full">
      {segments.map((item, index) => (
        <PublicHomeSegmentTemplate whiteBackground={index % 2 == 0} key={index}>
          {item}
        </PublicHomeSegmentTemplate>
      ))}
    </div>
  );
};

export default PublicHomePage;
