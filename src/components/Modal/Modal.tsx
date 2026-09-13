import { useEffect } from "react";
import styled from "./Modal.module.css";
import { createPortal } from "react-dom";
interface ModalProps { 
  children: React.ReactNode;
  onClose:()=>void
}
export default function Modal({ children, onClose}: ModalProps) {
  useEffect(() => {
	const handleKeyDown = (e: KeyboardEvent) => {
	  if (e.key === "Escape") {
	    onClose();
	  }
  };
    
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    	return () => {
	  document.removeEventListener("keydown", handleKeyDown);
	  document.body.style.overflow = "";
	};
}, [onClose]);

  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return createPortal(
    <div className={styled.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      
      <div className={styled.modal}>
        <button className={styled.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
