import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useRef } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  content?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  footer?: ReactNode;
  showCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  content,
  size = "md",
  footer,
  showCloseButton = true,
}: ModalProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    sm: "max-w-[384px]",
    md: "max-w-[448px]",
    lg: "max-w-[512px]",
    xl: "max-w-[576px]",
    "2xl": "max-w-[672px]",
    "3xl": "max-w-[768px]",
    "4xl": "max-w-[896px]",
    "5xl": "max-w-[1024px]",
    full: "max-w-[calc(100%-32px)]",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-[16px] text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-[12px] bg-white text-left align-middle shadow-xl transition-all`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-[24px] py-[16px]">
                  <DialogTitle
                    as="h3"
                    className="text-[18px] font-medium text-gray-900"
                  >
                    {title}
                  </DialogTitle>

                  {showCloseButton && (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={onClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[24px] w-[24px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-[24px]">{content || children}</div>

                {/* Footer */}
                {footer && (
                  <div className="border-t border-gray-200 px-[24px] py-[16px]">
                    {footer}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
