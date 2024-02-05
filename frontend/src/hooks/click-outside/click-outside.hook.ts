import { useEffect, useRef } from "react";

export const useClickOutside = (onClickOutside: () => void) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as Node).contains(event.target as Node)
      ) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClickOutside]);

  return ref;
};
