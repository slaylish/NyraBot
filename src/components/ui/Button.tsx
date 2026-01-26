import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        
        // Variants
        variant === 'primary' && "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
        variant === 'secondary' && "bg-surface text-zinc-400 hover:text-white hover:bg-surface-hover border border-border",
        variant === 'danger' && "bg-danger/10 text-danger hover:bg-danger/20 border border-danger/20",
        variant === 'ghost' && "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",

        // Sizes
        size === 'sm' && "px-3 py-1.5 text-xs",
        size === 'md' && "px-4 py-2.5 text-sm",
        size === 'lg' && "px-6 py-3 text-base",
        
        className
      )}
      {...props}
    />
  );
}
