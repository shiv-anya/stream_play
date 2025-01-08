import React, { useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };
  return ReactDOM.createPortal(
    <div
      className="bg-[rgba(0,0,0,0.9)] h-screen w-screen fixed top-0 left-0 flex justify-center items-center modal-backdrop z-30"
      onClick={handleBackdropClick}
    >
      {children}
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
