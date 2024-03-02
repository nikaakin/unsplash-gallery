import { createPortal } from "react-dom";
import { ModalProps } from "./type";

export const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  const modalJSX = (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-full transition-all  origin-center ${
        !isOpen ? "opacity-0 -z-10 scale-50" : "opacity-100 scale-100"
      }`}
    >
      <div
        className="absolute bg-gray-700 w-full h-full opacity-40"
        onClick={onClose}
      ></div>
      <div className="absolute flex w-11/12 md:w-1/2 bg-gray-100 min-h-80 max-h-80 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md py-4 px-3 md:px-10 pt-16">
        <button
          className="fixed right-7 top-8 flex flex-col gap-1 z-30 outline-none w-8 h-8 "
          onClick={onClose}
        >
          <span className="bg-stone-700 w-8 h-1 block transition-transform origin-center rotate-45 translate-y-1"></span>
          <span className="bg-stone-700 w-8 h-1 block transition-transform origin-center -rotate-45  -translate-y-1"></span>
        </button>
        <div className="w-full h-full relative">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalJSX, document.getElementById("modal")!);
};
