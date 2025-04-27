// src/components/common/Button.tsx
import React from 'react';

interface ButtonProps {
  text: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'danger' | 'success';
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, icon, color, size, onClick }) => {
  const colorClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <button
      className={`${colorClasses[color]} ${sizeClasses[size]} rounded flex items-center gap-2 focus:outline-none `}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
