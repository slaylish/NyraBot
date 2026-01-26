import { cn } from '@/lib/utils';
import React from 'react';

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2",
        className
      )}
      {...props}
    />
  );
}
