import { HTMLAttributes } from "react";
import { ModalWrapperStyles } from "./ModalWrapperStyles";

export interface ModalWrapperProps extends HTMLAttributes<HTMLDivElement> {
  onRejected?: () => void;
  isOpen: boolean;
  styles?: ModalWrapperStyles;
  duration?: number;
}
