import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all duration-300 rounded-sm group focus:outline-none";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary hover:bg-primary/20 hover:shadow-neon-primary",
    secondary: "bg-secondary/10 text-secondary border border-secondary hover:bg-secondary/20 hover:shadow-neon-secondary",
    accent: "bg-accent/10 text-accent border border-accent hover:bg-accent/20 hover:shadow-neon-accent",
    outline: "border border-muted text-gray-300 hover:text-white hover:border-gray-500",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
      <span className="relative">{children}</span>
    </button>
  );
};
