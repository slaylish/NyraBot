'use client';

import { Icons } from "@/components/icons";

export function MobileBlocker() {
  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-8 text-center md:hidden">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 animate-pulse text-primary">
        <Icons.Shield size={40} />
      </div>
      <h1 className="text-3xl font-bold font-display mb-4 text-white">Desktop Only</h1>
      <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed">
        Nyra Dashboard is a professional tool designed for large screens.
        <br /><br />
        Please access this dashboard on your <strong>PC</strong> or <strong>Tablet</strong> (Desktop Mode) for the best experience.
      </p>
    </div>
  );
}
