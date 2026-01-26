'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  // Don't show on dashboard pages (they have sidebar)
  if (pathname?.startsWith('/dashboard/') && pathname !== '/dashboard') {
    return null;
  }

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const avatarUrl = user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : null;

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
            N
          </div>
          <span className="font-bold text-xl tracking-tight">Nyra</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <Link href="/premium" className={`hover:text-white transition-colors ${pathname === '/premium' ? 'text-white' : ''}`}>
            Pricing
          </Link>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="https://discord.gg/nyra" target="_blank" rel="noopener" className="hover:text-white transition-colors">Support</a>
        </div>
        
        {user ? (
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            {avatarUrl ? (
              <img src={avatarUrl} alt={user.username} className="w-7 h-7 rounded-full" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium">{user.username}</span>
          </Link>
        ) : (
          <Link href="/login" className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all hover:scale-105">
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
