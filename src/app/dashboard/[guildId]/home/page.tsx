'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/Card';

interface GuildInfo {
  name: string;
  icon: string | null;
  memberCount: number;
  region: string;
}

interface UserInfo {
  id: string;
  username: string;
  avatar: string;
}

export default function HomeOverview() {
  const params = useParams();
  const guildId = params?.guildId as string;
  const [guild, setGuild] = useState<GuildInfo | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!guildId) return;

    fetch(`/api/guilds/${guildId}`)
      .then(r => r.json())
      .then(d => setGuild(d.guild))
      .catch(() => {});

    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => setUser(d.user))
      .catch(() => {});
  }, [guildId]);

  return (
    <div className="flex min-h-screen bg-background font-sans text-white">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 px-8 border-b border-border flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="text-lg font-semibold">Overview</h1>
          {user && (
            <a href="/account" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              {user.avatar ? (
                <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} className="w-8 h-8 rounded-full" alt="" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-surface" />
              )}
              <span className="text-sm font-medium">{user.username}</span>
            </a>
          )}
        </header>

        {/* Content */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="min-w-[240px]">
              <div className="text-sm text-zinc-500 mb-2">Member Count</div>
              <div className="text-4xl font-bold">{guild?.memberCount?.toLocaleString() || '—'}</div>
            </Card>

            <Card className="min-w-[240px] bg-card">
              <div className="text-sm text-zinc-500 mb-2">Region</div>
              <div className="text-4xl font-bold">{guild?.region || 'Auto'}</div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
