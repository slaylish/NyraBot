'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icons } from '@/components/icons';

interface GuildInfo {
  name: string;
  icon: string | null;
  memberCount: number;
  isPremium: boolean;
}

interface Stats {
  totalCases: number;
  openTickets: number;
  pendingAppeals: number;
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
  const [stats, setStats] = useState<Stats | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!guildId) return;

    fetch(`/api/guilds/${guildId}`)
      .then(r => r.json())
      .then(d => {
        setGuild(d.guild);
        setStats(d.stats);
      })
      .catch(console.error);

    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => setUser(d.user))
      .catch(console.error);
  }, [guildId]);

  return (

      <div className="flex-1 flex flex-col">
        <main className="p-8 space-y-8">
           <PageHeader 
             title="Overview" 
             description={`Welcome back, ${user?.username || 'Commander'}`} 
             action={
               user && (
                  <a href="/account" className="flex items-center gap-3 hover:opacity-80 transition-opacity p-1 pr-4 rounded-full bg-surface border border-white/5">
                    {user.avatar ? (
                      <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} className="w-8 h-8 rounded-full" alt="" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                          {user.username.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium">{user.username}</span>
                  </a>
               )
             }
           />
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="text-sm text-zinc-500 mb-1 font-medium">Total Members</div>
              <div className="text-3xl font-bold font-display">{guild?.memberCount?.toLocaleString() || '—'}</div>
              <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium bg-emerald-400/10 w-fit px-2 py-0.5 rounded-full">
                <Icons.TrendUp size={12} /> Live
              </div>
            </Card>

            <Card>
              <div className="text-sm text-zinc-500 mb-1 font-medium">Premium Status</div>
              <div className="flex items-center gap-2">
                <div className={`text-3xl font-bold font-display ${guild?.isPremium ? 'text-primary' : 'text-zinc-400'}`}>
                  {guild?.isPremium ? 'Pro' : 'Free'}
                </div>
                {guild?.isPremium && <Icons.Crown className="text-primary" />}
              </div>
            </Card>
            
            <Card>
              <div className="text-sm text-zinc-500 mb-1 font-medium">Open Tickets</div>
              <div className="text-3xl font-bold font-display">{stats?.openTickets || 0}</div>
              <div className="text-xs text-zinc-500 mt-2">Active requests</div>
            </Card>

            <Card>
              <div className="text-sm text-zinc-500 mb-1 font-medium">Pending Appeals</div>
              <div className="text-3xl font-bold font-display">{stats?.pendingAppeals || 0}</div>
              <div className={`text-xs mt-2 w-fit px-2 py-0.5 rounded-full font-medium ${stats?.pendingAppeals ? 'bg-yellow-400/10 text-yellow-400' : 'bg-zinc-500/10 text-zinc-500'}`}>
                {stats?.pendingAppeals ? 'Requires attention' : 'All clear'}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Graph Placeholder */}
            <Card className="lg:col-span-2 flex items-center justify-center h-80 border-dashed bg-transparent">
               <div className="text-center opacity-50">
                 <Icons.Grid size={48} className="mx-auto mb-4 text-zinc-600" />
                 <p className="text-zinc-500 font-semibold">Activity Graph</p>
                 <p className="text-zinc-600 text-sm">Waiting for enough data points...</p>
               </div>
            </Card>

            {/* Notifications */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2"><Icons.Bell /> Notifications</h3>
              </div>
              <div className="text-center py-12 text-zinc-500 text-sm flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center mb-3">
                    <Icons.Bell size={20} className="text-zinc-600" />
                </div>
                No new notifications
              </div>
            </Card>
          </div>
        </main>
      </div>
    
  );
}
