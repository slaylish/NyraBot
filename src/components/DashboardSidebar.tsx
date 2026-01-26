'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface GuildInfo {
  name: string;
  icon: string | null;
}

interface UserInfo {
  id: string;
  username: string;
  avatar: string;
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

export default function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const guildId = params?.guildId as string;
  const [guild, setGuild] = useState<GuildInfo | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!guildId) return;
    
    // Fetch guild
    fetch(`/api/guilds/${guildId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setGuild(data.guild))
      .catch(() => {});

    // Fetch user
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setUser(data.user))
      .catch(() => {});
  }, [guildId]);

  const isActive = (href: string) => {
    if (href === 'home') return pathname === `/dashboard/${guildId}/home`;
    return pathname?.startsWith(`/dashboard/${guildId}/${href}`);
  };

  const iconUrl = guild?.icon 
    ? `https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.png`
    : null;

  const userAvatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d0d0f' }}>
      {/* Sidebar */}
      <aside style={{ width: 200, borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
        {/* Server Header */}
        <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {iconUrl ? (
              <img src={iconUrl} alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />
            ) : (
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
                {guild?.name?.charAt(0) || 'N'}
              </div>
            )}
            <span style={{ fontWeight: 600, fontSize: 14, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {guild?.name || 'Loading...'}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: 12 }}>
          <Link
            href={`/dashboard/${guildId}/home`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 12px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: isActive('home') ? '#fff' : '#888',
              background: isActive('home') ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
              textDecoration: 'none',
              marginBottom: 4,
            }}
          >
            <GridIcon />
            Overview
          </Link>

          <div style={{ padding: '16px 12px 8px', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>
            Modules
          </div>

          {modules.map((item) => (
            <Link
              key={item.label}
              href={`/dashboard/${guildId}/${item.href}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: isActive(item.href) ? '#fff' : '#888',
                background: isActive(item.href) ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
                textDecoration: 'none',
                marginBottom: 4,
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Back Link */}
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link 
            href="/dashboard" 
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666', textDecoration: 'none' }}
          >
            <ArrowLeftIcon />
            Back to Selector
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: '#fff', margin: 0 }}>Overview</h1>
          {user && (
            <Link href="/account" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              {userAvatarUrl ? (
                <img src={userAvatarUrl} alt="" style={{ width: 32, height: 32, borderRadius: 999 }} />
              ) : (
                <div style={{ width: 32, height: 32, borderRadius: 999, background: '#333' }} />
              )}
              <span style={{ fontSize: 14, color: '#fff' }}>{user.username}</span>
            </Link>
          )}
        </header>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
