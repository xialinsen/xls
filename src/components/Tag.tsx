import React from 'react';
import { cn } from './Button';

interface TagProps {
  name: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ name, active = false, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 text-xs font-mono rounded-full border transition-all duration-300",
        active 
          ? "border-primary text-primary bg-primary/10 shadow-neon-primary" 
          : "border-muted text-gray-400 hover:border-primary/50 hover:text-primary",
        className
      )}
    >
      #{name}
    </button>
  );
};
