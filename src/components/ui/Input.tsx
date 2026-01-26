import { cn } from '@/lib/utils';
import React from 'react';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl bg-background border border-border px-4 py-2.5 text-sm text-white placeholder-zinc-500",
        "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all",
        className
      )}
      {...props}
    />
  );
}
