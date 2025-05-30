import React, { ReactNode, useEffect } from 'react';
import GlobalButton from '@/constants/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = 'Modal',
  children,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-[var(--bg-light-color)] p-6 rounded-lg shadow-[var(--shadow-color)] w-96 relative"
        style={{ fontFamily: 'var(--font-family-cabin)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <GlobalButton
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--text-color)] hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full"
          aria-label="Close"
        >
          ×
        </GlobalButton>
        <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;