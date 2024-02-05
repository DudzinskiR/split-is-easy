import { HTMLAttributes } from "react";
import { ModalWrapperStyles } from "./modal-wrapper-styles.interface";

export interface ModalWrapperProps extends HTMLAttributes<HTMLDivElement> {
  onRejected?: () => void;
  isOpen: boolean;
  styles?: ModalWrapperStyles;
  duration?: number;
}
