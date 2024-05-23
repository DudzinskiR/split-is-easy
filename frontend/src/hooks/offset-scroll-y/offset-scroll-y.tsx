import { useEffect, useState } from "react";

export const useOffsetScrollY = () => {
  const [offsetScrollY, setOffsetScrollY] = useState(0);

  const handleScroll = () => {
    setOffsetScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { offsetScrollY };
};
