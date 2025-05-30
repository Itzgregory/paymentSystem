"use client";

import React from 'react';
import styles from '../passwordreset/Sendemail/Modal.module.css';

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className={`${styles.modalOverlay} fixed inset-0 flex items-center justify-center z-50`}
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} bg-red-500 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 relative`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Success!</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="py-4">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white text-center mb-4">
            Password reset email has been sent successfully.
            Please check your inbox and follow the instructions.
          </p>
        </div>
        
        <div className="flex justify-center mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-red-500 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;