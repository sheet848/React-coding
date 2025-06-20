import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ isOpen, onClose, title, children }) => {

    const modalRef = useRef(null);
    const lastFocusedElement = useRef(null);

    useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement;
      // Delay to ensure modal is rendered
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        // Trap focus inside modal
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <><div
      role="dialog"
      tabIndex={-1}
      ref={modalRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose(); // close on outside click
        }
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        outline: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 8,
          maxWidth: 500,
          width: "90%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2 id="modal-title" style={{ marginTop: 0 }}>
          {title}
        </h2>
        <div id="modal-desc" style={{ marginBottom: 16 }}>
          {children}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div></>,
    document.body
  )
}

export default Modal