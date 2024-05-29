import { ReactNode, useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";
import {
  FaqSection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  PublicNavbar,
  ScreenshotsSection,
  WorkSection,
} from "./components";
import { ScrollToButton } from "src/components/scroll-to-button/scroll-to-button";

export type NavbarElement = {
  component: ReactNode;
  name?: string;
};

const segments: NavbarElement[] = [
  { component: <HeroSection />, name: "home" },
  { component: <WorkSection /> },
  { component: <ScreenshotsSection />, name: "screenshots" },
  { component: <FeaturesSection />, name: "features" },
  { component: <FaqSection />, name: "FAQ" },
  { component: <FooterSection /> },
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
        className={twJoin(
          "absolute top-[80vh] z-10 absolute-center-x duration-500",
          isScrollToTopButtonShow ? "opacity-0" : "opacity-100"
        )}
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
