'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  hasBot: boolean;
}

const BOT_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1464998515695419596&permissions=8&scope=bot%20applications.commands';

export default function DashboardSelector() {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/guilds')
      .then(r => r.json())
      .then(d => {
        setGuilds(d.guilds || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getInviteUrl = (guildId: string) => 
    `${BOT_INVITE_URL}&guild_id=${guildId}&disable_guild_select=true`;

  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors inline-block mb-6">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Select a Server</h1>
              <p className="text-zinc-500 mt-1">Choose a server to manage</p>
            </div>
            <Link href="/account" className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-zinc-400 hover:text-white transition-colors">
              Account
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-surface animate-pulse" />
            ))}
          </div>
        ) : guilds.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-surface border border-border">
            <p className="text-zinc-500 mb-4">No servers found</p>
            <a href="/login" className="px-6 py-3 rounded-xl bg-primary text-white font-semibold">
              Sign in with Discord
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {guilds.map((guild) => {
              const iconUrl = guild.icon 
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
                : null;

              if (guild.hasBot) {
                return (
                  <a key={guild.id} href={`/dashboard/${guild.id}/home`} className="group block">
                    <div className="aspect-square rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all p-5 flex flex-col items-center justify-center text-center">
                      {iconUrl ? (
                        <img src={iconUrl} alt={guild.name} className="w-14 h-14 rounded-xl mb-3 group-hover:scale-110 transition-transform" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-white font-bold text-lg">
                          {guild.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <h3 className="font-semibold text-sm truncate w-full text-white">{guild.name}</h3>
                      <span className="text-xs text-emerald-400 mt-1">● Connected</span>
                    </div>
                  </a>
                );
              }

              return (
                <a key={guild.id} href={getInviteUrl(guild.id)} target="_blank" rel="noopener noreferrer" className="group block opacity-60 hover:opacity-100 transition-opacity">
                  <div className="aspect-square rounded-2xl bg-surface-hover border border-border p-5 flex flex-col items-center justify-center text-center">
                    {iconUrl ? (
                      <img src={iconUrl} alt={guild.name} className="w-14 h-14 rounded-xl mb-3 grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center mb-3 text-zinc-500 font-bold">
                        {guild.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <h3 className="font-semibold text-sm truncate w-full text-zinc-400 group-hover:text-white transition-colors">{guild.name}</h3>
                    <span className="text-xs text-zinc-500 mt-1">+ Add Bot</span>
                  </div>
                </a>
              );
            })}

            {/* Add Server */}
            <a href={BOT_INVITE_URL} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-all flex flex-col items-center justify-center p-5">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors text-zinc-500 group-hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                </div>
                <span className="text-sm text-zinc-500 group-hover:text-white transition-colors">Add Server</span>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
