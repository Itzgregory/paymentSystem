"use client";

import React, { useState } from 'react';
import styles from './Modal.module.css';

interface EmailModalProps {
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z]{2,}$/i)) {
      setLocalError('Please enter a valid email address.');
      return;
    }
    setLocalError('');
    onSubmit(email);
  };

  return (
    <div 
      className={`${styles.modalOverlay} fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`${styles.modalContent} bg-white p-6 rounded-lg shadow-md w-96`}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`${styles.closeButton} absolute top-3 right-3 text-gray-600 hover:text-gray-800`}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        {/* Error Message */}
        {localError && <p className="text-red-500 text-sm text-center mb-4">{localError}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={styles.formGroup}>
            <div className={styles.inputBox}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.inputField} w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder=" "
                required
              />
              <label className={styles.label}>Email</label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="global-button"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
