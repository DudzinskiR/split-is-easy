import { ReactNode, useEffect, useRef, useState } from "react";

import {
  AboutSegment,
  FaqSegment,
  FeatureSegment,
  FooterSegment,
  HowAppWorkSegment,
  MainSegment,
} from "./components/segments";
import { PublicNavbar } from "./components";
import { ScrollToButton } from "src/components/scroll-to-button";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { twJoin } from "tailwind-merge";

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
  const [isScrollToTopButtonShow, setScrollToTopButtonShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollToTopButtonShow(scrollTop > window.screenY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <PublicNavbar elements={segments} segmentsRef={segmentsRef} height={60} />
      <ScrollToButton
        positionToScroll={
          (segmentsRef.current[1]?.getBoundingClientRect().top || 0) +
          window.scrollY -
          60
        }
        className="absolute absolute-center-x top-[85vh] z-10 animate-bounce"
        icon={<FaArrowDown />}
      />
      <ScrollToButton
        positionToScroll={0}
        className={twJoin(
          "fixed right-[50px] top-[85vh] z-10",
          isScrollToTopButtonShow ? "opacity-100" : "opacity-0"
        )}
        icon={<FaArrowUp />}
      />
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
