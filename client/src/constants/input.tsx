import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  [key: string]: any; 
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-[var(--text-color)] mb-2 font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] ${error ? 'border-red-500' : ''} ${className}`}
        style={{ fontFamily: 'var(--font-family-cabin)' }}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;