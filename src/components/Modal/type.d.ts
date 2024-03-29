import { ReactNode } from "react";

export type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
};
