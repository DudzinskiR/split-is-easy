import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/features/store";
import {
  addNewID,
  removeID,
  removeNewest,
} from "src/features/visibility/visibility.slice";
import { v4 as uuidv4 } from "uuid";

interface visibilityToggleConfig {
  onShow?: () => void;
  onHide?: () => void;
  initialValue?: boolean;
}

export const useVisibilityToggle = (
  config: visibilityToggleConfig = { initialValue: false }
) => {
  const id = useRef(uuidv4());
  const [isLocalOpen, setLocalOpen] = useState(config.initialValue || false);
  const newestID = useSelector(
    (state: RootState) => state.visibility.IDs.slice(-1)[0]
  );
  const IDState = useSelector((state: RootState) =>
    state.visibility.IDs.find((item) => item === id.current)
  );
  const dispatch = useDispatch();
  const setOpen = (value: boolean) => {
    if (value) {
      if (!IDState) {
        dispatch(addNewID(id.current));
        if (config.onShow) {
          config.onShow();
        }
      }
    } else {
      if (IDState) {
        dispatch(removeID(id.current));
        if (config.onHide) {
          config.onHide();
        }
      }
    }
    setLocalOpen(value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(removeNewest());
        setLocalOpen(false);
        if (config.onHide) {
          config.onHide();
        }
      }
    };

    if (newestID === id.current) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestID, id]);

  useEffect(() => {
    if (config.initialValue) {
      dispatch(addNewID(id.current));
      if (config.onShow) {
        config.onShow();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  useEffect(
    () => () => {
      dispatch(removeID(id.current));
      if (config.onHide) {
        config.onHide();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return { isOpen: isLocalOpen, setOpen };
};
