import { ReactNode } from 'react';

interface TechCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export function TechCard({ children, className = '', onClick, hoverEffect = true }: TechCardProps) {
  return (
    <div 
      className={`
        bg-surface/80 backdrop-blur-sm tech-border p-6 
        ${hoverEffect ? 'hover:shadow-neon-primary transition-all duration-300 cursor-pointer hover:-translate-y-1' : ''} 
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
