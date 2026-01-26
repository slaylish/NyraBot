'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '..' },
  { label: 'Tickets', href: '../tickets' },
  { label: 'Appeals', href: '../appeals' },
  { label: 'Reports', href: '../reports' },
  { label: 'Surveys', href: '../surveys' },
  { label: 'Suggestions', href: '../suggestions' },
  { label: 'Messages', href: '../messages' },
  { label: 'Settings', href: '.' },
];

export default function SupportSettingsPage() {
  const [transcriptChannel, setTranscriptChannel] = useState('#ticket-logs');
  const [supportRoles, setSupportRoles] = useState(['Support Staff']);
  const [adminRoles, setAdminRoles] = useState(['Admin']);
  const [blacklist, setBlacklist] = useState(['Spammer#1234']);

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Support Settings</h1>
          <p className="text-zinc-400">Configure support module behavior</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 7 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Transcript Channel */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Logging</h3>
          <div>
            <label className="block text-sm text-zinc-500 mb-2">Transcript Channel</label>
            <select value={transcriptChannel} onChange={(e) => setTranscriptChannel(e.target.value)} className="w-full max-w-md p-3 rounded-xl bg-surface border border-white/10">
              <option>#ticket-logs</option>
              <option>#admin-logs</option>
              <option>Disabled</option>
            </select>
          </div>
        </div>

        {/* Staff Roles */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4 text-cyan-400">Support Staff</h3>
            <p className="text-sm text-zinc-500 mb-4">Can view and respond to tickets</p>
            <div className="flex flex-wrap gap-2">
              {supportRoles.map((r) => (
                <span key={r} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm">@{r}</span>
              ))}
              <button className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm">+ Add</button>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4 text-red-400">Support Admins</h3>
            <p className="text-sm text-zinc-500 mb-4">Can access appeals and settings</p>
            <div className="flex flex-wrap gap-2">
              {adminRoles.map((r) => (
                <span key={r} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm">@{r}</span>
              ))}
              <button className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm">+ Add</button>
            </div>
          </div>
        </div>

        {/* Blacklist */}
        <div className="glass rounded-2xl p-6 border border-red-500/20">
          <h3 className="font-bold mb-4 text-red-400">Blacklist</h3>
          <p className="text-sm text-zinc-500 mb-4">Users blocked from the support module</p>
          <div className="flex flex-wrap gap-2">
            {blacklist.map((u) => (
              <span key={u} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm">{u}</span>
            ))}
            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm">+ Add User</button>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition-transform">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
