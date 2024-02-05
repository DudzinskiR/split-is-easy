import { useEffect, useRef, useState } from "react";

export const useRefHeight = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return { height, width, ref };
};
