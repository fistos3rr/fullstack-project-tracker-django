import React from 'react';


export interface ButtonProps {
  variant?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: string; 
}

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95',
  secondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500 shadow-md active:scale-95',
  outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 focus:ring-blue-500 active:scale-95',
  ghost: 'text-gray-300 hover:bg-white/10 focus:ring-white/30 active:scale-95',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/20 active:scale-95',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-lg shadow-emerald-500/20 active:scale-95',
  gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 focus:ring-purple-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 active:scale-95 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500',
};

const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';

const sizeStyles = {
  xs: 'px-2.5 py-1.5 text-xs gap-1',
  sm: 'px-3 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-3',
};

export const Button = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  className = '',
  size = 'md',
}: ButtonProps) => {
  return (
    <button
      className={`
        ${baseStyles}
        ${variantClasses[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children && <span>{children}</span>}
    </button>
  );
};
