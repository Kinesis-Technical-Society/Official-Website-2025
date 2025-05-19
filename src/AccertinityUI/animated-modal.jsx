"use client";
import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  memo
} from "react";

// ====================
// Modal Context
// ====================

const ModalContext = createContext(undefined);

/**
 * ModalProvider provides modal open/close state to children.
 * @param {{ children: React.ReactNode }} props
 */
export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * Hook to access modal open/close state.
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

/**
 * Wrapper component to provide modal context.
 * @param {{ children: React.ReactNode }} props
 */
export function Modal({ children }) {
  return <ModalProvider>{children}</ModalProvider>;
}

// ====================
// Modal Trigger Button
// ====================

/**
 * Trigger button to open the modal.
 * @param {{ children: React.ReactNode, className?: string }} props
 */
export const ModalTrigger = memo(({ children, className }) => {
  const { setOpen } = useModal();

  const handleClick = useCallback(() => setOpen(true), [setOpen]);

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg text-center relative overflow-hidden font-bold",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
});
ModalTrigger.displayName = "ModalTrigger";

// ====================
// Hook: useOutsideClick
// ====================

/**
 * Runs callback if a click occurs outside the given ref.
 * @param {React.RefObject} ref
 * @param {(event: MouseEvent | TouchEvent) => void} callback
 */
export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref?.current || ref.current.contains(event.target)) return;
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
