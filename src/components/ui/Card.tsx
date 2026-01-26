import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all border border-transparent",
        variant === 'default' && "bg-surface border-border",
        variant === 'elevated' && "bg-card border-border/50",
        className
      )}
      {...props}
    />
  );
}
