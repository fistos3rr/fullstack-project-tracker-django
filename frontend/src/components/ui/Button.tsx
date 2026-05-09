import React from 'react';


export interface ButtonProps {
  variant?: 'primary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
};

export const Button = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  className = ''
}: ButtonProps) => {
  return (
    <button
      className={`
        ${variantClasses[variant]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
