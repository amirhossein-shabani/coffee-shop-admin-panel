import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }) {
  // ESC Closing
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-[90%] max-w-lg p-3 bg-white shadow-xl rounded-2xl animate-scaleIn">
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
