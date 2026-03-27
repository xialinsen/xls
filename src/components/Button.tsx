import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyle = "relative font-mono font-bold tracking-widest px-6 py-2 uppercase transition-all duration-300";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-black hover:shadow-neon-primary",
    secondary: "bg-secondary/10 text-secondary border border-secondary hover:bg-secondary hover:text-black hover:shadow-neon-secondary",
    outline: "border border-gray-600 text-gray-300 hover:border-primary hover:text-primary",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
