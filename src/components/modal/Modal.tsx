import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Modal({
  children,
  onClose,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-screen bg-[#00000077] z-[45]"
      />
      <motion.dialog
        open
        className={`backdrop fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center rounded-md px-6 py-4 w-[90%] max-w-md z-50  shadow-lg  bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100  ${className}`}
        ref={dialogRef}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!
  );
}
