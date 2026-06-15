"use client";

import { createPortal } from "react-dom";
import { useAccessibleModal } from "./useAccessibleModal";

type AccessibleModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  labelledBy: string;
  onClose: () => void;
  zIndexClassName?: string;
};

export function AccessibleModal({
  children,
  isOpen,
  labelledBy,
  onClose,
  zIndexClassName = "z-50",
}: AccessibleModalProps) {
  const { modalRef } = useAccessibleModal(isOpen, onClose);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={modalRef}
      className={`fixed inset-0 ${zIndexClassName} flex items-start justify-center overflow-y-auto bg-blue-950/80 p-4 backdrop-blur-sm sm:p-8`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      tabIndex={-1}
    >
      {children}
    </div>,
    document.body
  );
}
