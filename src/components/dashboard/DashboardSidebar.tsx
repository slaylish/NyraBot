'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

interface SubModule {
  label: string;
  href: string;
}

interface Module {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  submodules?: SubModule[];
}

const modules: Module[] = [
  { 
    label: 'Overview', 
    href: 'home', 
    icon: Icons.Grid
  },
  { 
    label: 'Security', 
    href: 'moderation', 
    icon: Icons.Shield,
    submodules: [
       { label: 'Audit Log', href: 'moderation' },
       { label: 'Auto-Mod', href: 'moderation/automod' },
    ]
  },
  { 
    label: 'Support', 
    href: 'support', 
    icon: Icons.Ticket,
    submodules: [
      { label: 'Dashboard', href: 'support' },
      { label: 'Tickets', href: 'support/tickets' },
      { label: 'Appeals', href: 'support/appeals' },
      { label: 'Settings', href: 'support/settings' },
    ]
  },
  { 
    label: 'Messages', 
    href: 'messages', 
    icon: Icons.Message,
    submodules: [
       { label: 'Builder', href: 'messages/builder' },
       { label: 'Branding', href: 'messages/branding' },
       { label: 'Responses', href: 'messages/responses' },
       { label: 'Broadcast', href: 'messages/broadcast' },
    ]
  },
  { 
    label: 'Settings', 
    href: 'settings', 
    icon: Icons.Settings 
  },
];

interface GuildInfo {
  name: string;
  icon: string | null;
}

export function DashboardSidebar() {
  const params = useParams();
  const pathname = usePathname();
  const guildId = params?.guildId as string;
  const [guild, setGuild] = useState<GuildInfo | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newExpanded = { ...expanded };
    modules.forEach(m => {
      if (pathname?.includes(`/dashboard/${guildId}/${m.href}`)) {
        newExpanded[m.label] = true;
      }
    });
    setExpanded(newExpanded);
  }, [pathname, guildId]);

  useEffect(() => {
    if (!guildId) return;
    fetch(`/api/guilds/${guildId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setGuild(data.guild))
      .catch(() => {});
  }, [guildId]);

  const isActive = (href: string) => {
    if (href === 'home') return pathname === `/dashboard/${guildId}/home`;
    const fullPath = `/dashboard/${guildId}/${href}`;
    return pathname === fullPath || pathname?.startsWith(fullPath + '/');
  };

  const isSubActive = (href: string) => {
    return pathname === `/dashboard/${guildId}/${href}`;
  };

  const toggleExpand = (label: string) => {
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const iconUrl = guild?.icon 
    ? `https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.png`
    : null;

  return (
    <aside className="w-[260px] bg-background border-r border-border flex flex-col h-screen sticky top-0 scrollbar-hide">
      {/* Server Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3.5">
          {iconUrl ? (
            <img src={iconUrl} alt="" className="w-10 h-10 rounded-xl" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-primary/20">
              {guild?.name?.charAt(0) || 'N'}
            </div>
          )}
          <span className="font-bold text-sm truncate text-white max-w-[140px]">
            {guild?.name || 'Loading...'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 opacity-80">
          Main Menu
        </div>

        {modules.map((item) => {
          const isItemActive = isActive(item.href);
          const hasCloud = item.submodules && item.submodules.length > 0;
          const isExpanded = expanded[item.label];

          return (
            <div key={item.label} className="mb-1.5">
              {hasCloud ? (
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left group",
                    isItemActive 
                      ? "text-white bg-white/5 border border-white/5" 
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isItemActive ? "text-primary" : "group-hover:text-zinc-300"} />
                    {item.label}
                  </div>
                  {isExpanded ? <Icons.ChevronDown size={14} className="opacity-50" /> : <Icons.ChevronRight size={14} className="opacity-50" />}
                </button>
              ) : (
                <a
                  href={`/dashboard/${guildId}/${item.href}`}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group",
                    isItemActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  )}
                >
                  <item.icon size={18} className={isItemActive ? "text-white" : "group-hover:text-zinc-300"} />
                  {item.label}
                </a>
              )}

              {hasCloud && isExpanded && (
                <div className="mt-1 ml-5 border-l border-white/10 pl-3 space-y-1 relative">
                  {item.submodules!.map((sub) => (
                    <a
                      key={sub.label}
                      href={`/dashboard/${guildId}/${sub.href}`}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        isSubActive(sub.href)
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <a 
          href="/dashboard" 
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Icons.ArrowLeft size={18} />
          Switch Server
        </a>
      </div>
    </aside>
  );
}
