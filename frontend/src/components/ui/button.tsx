import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  className = '',
                                                  ...props
                                              }) => {
    const baseStyles = 'font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};