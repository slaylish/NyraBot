'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface GuildInfo {
  name: string;
  icon: string | null;
}

// Icons
const GridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const TicketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>;
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v10M4.2 4.2l4.3 4.3m7 7l4.3 4.3m0-15.6-4.3 4.3m-7 7-4.3 4.3M1 12h6m6 0h10"/></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;

const modules = [
  { label: 'Security', href: 'moderation', icon: <ShieldIcon /> },
  { label: 'Support', href: 'support', icon: <TicketIcon /> },
  { label: 'Messages', href: 'messages', icon: <MessageIcon /> },
  { label: 'Settings', href: 'settings', icon: <SettingsIcon /> },
];

export function DashboardSidebar() {
  const params = useParams();
  const pathname = usePathname();
  const guildId = params?.guildId as string;
  const [guild, setGuild] = useState<GuildInfo | null>(null);

  useEffect(() => {
    if (!guildId) return;
    fetch(`/api/guilds/${guildId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setGuild(data.guild))
      .catch(() => {});
  }, [guildId]);

  const isActive = (href: string) => {
    if (href === 'home') return pathname === `/dashboard/${guildId}/home`;
    return pathname?.startsWith(`/dashboard/${guildId}/${href}`);
  };

  const iconUrl = guild?.icon 
    ? `https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.png`
    : null;

  return (
    <aside className="w-[220px] bg-background border-r border-border flex flex-col h-screen sticky top-0">
      {/* Server Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          {iconUrl ? (
            <img src={iconUrl} alt="" className="w-8 h-8 rounded-lg" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm font-bold text-white">
              {guild?.name?.charAt(0) || 'N'}
            </div>
          )}
          <span className="font-semibold text-sm truncate text-white">
            {guild?.name || 'Loading...'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <a
          href={`/dashboard/${guildId}/home`}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-4",
            isActive('home') 
              ? "bg-primary/20 text-white" 
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          )}
        >
          <GridIcon />
          Overview
        </a>

        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Modules
        </div>

        {modules.map((item) => (
          <a
            key={item.label}
            href={`/dashboard/${guildId}/${item.href}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              isActive(item.href) 
                ? "bg-primary/20 text-white" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>

      {/* Back Link */}
      <div className="p-4 border-t border-border">
        <a 
          href="/dashboard" 
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeftIcon />
          Back to Selector
        </a>
      </div>
    </aside>
  );
}
