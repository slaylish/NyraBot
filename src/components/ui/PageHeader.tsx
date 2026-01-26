'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between mb-8 pb-6 border-b border-white/5", className)}>
        <div>
            <h1 className="text-3xl font-bold text-white font-display tracking-tight">{title}</h1>
            {description && <p className="text-zinc-400 mt-2 text-lg font-light">{description}</p>}
        </div>
        {action && <div>{action}</div>}
    </div>
  );
}
