import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] p-6 transition-all duration-300 relative overflow-hidden group",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.03] before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100",
        variant === 'default' && "bg-[#131316] border border-white/5 hover:border-white/10 shadow-2xl shadow-black/50",
        variant === 'elevated' && "bg-[#1c1c20] border border-white/10 shadow-xl",
        variant === 'glass' && "bg-white/[0.02] backdrop-blur-2xl border border-white/5",
        className
      )}
      {...props}
    />
  );
}
