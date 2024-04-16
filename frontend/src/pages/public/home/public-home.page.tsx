import { ReactNode, useRef } from "react";

import {
  AboutSegment,
  FaqSegment,
  FeatureSegment,
  FooterSegment,
  HowAppWorkSegment,
  MainSegment,
} from "./components/segments";
import { PublicNavbar } from "./components";

export type NavbarElement = {
  component: ReactNode;
  name?: string;
};

const segments: NavbarElement[] = [
  { component: <MainSegment />, name: "Home" },
  { component: <AboutSegment />, name: "About" },
  { component: <FeatureSegment />, name: "Feature" },
  { component: <HowAppWorkSegment />, name: "HOW IT WORK" },
  { component: <FaqSegment />, name: "FAQ" },
  { component: <FooterSegment /> },
];

const PublicHomePage = () => {
  const segmentsRef = useRef<HTMLDivElement[]>([]);

  return (
    <>
      <PublicNavbar elements={segments} segmentsRef={segmentsRef} />
      <div className="flex flex-col w-full">
        {segments.map((item, index) => (
          <div
            key={index}
            ref={(element) => {
              if (element) segmentsRef.current[index] = element;
              return segmentsRef;
            }}
          >
            {item.component}
          </div>
        ))}
      </div>
    </>
  );
};

export default PublicHomePage;
