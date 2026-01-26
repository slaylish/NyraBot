'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

const navItems = [
  { label: 'General', href: '..' },
  { label: 'Permissions', href: '.' },
  { label: 'Commands', href: '../commands' },
  { label: 'Data & Privacy', href: '../data' },
];

export default function PermissionsPage() {
  const [adminRoles, setAdminRoles] = useState(['Admin', 'Bot Manager']);
  const [modRoles, setModRoles] = useState(['Moderator', 'Helper']);
  const [supportRoles, setSupportRoles] = useState(['Support Staff']);
  const [ignoredChannels, setIgnoredChannels] = useState(['#memes', '#spam']);

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Permissions</h1>
          <p className="text-zinc-400">Role-based access control (RBAC)</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 1 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Admin Access */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-2 flex items-center gap-2 text-red-400"><ShieldIcon /> Bot Administrators</h3>
          <p className="text-sm text-zinc-500 mb-4">Full access to dashboard and all commands</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {adminRoles.map((role) => (
              <span key={role} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm">
                @{role}
                <button onClick={() => setAdminRoles(adminRoles.filter(r => r !== role))} className="hover:bg-red-500/20 rounded p-0.5"><XIcon /></button>
              </span>
            ))}
            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm hover:bg-white/10">+ Add Role</button>
          </div>
        </div>

        {/* Module Access */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-yellow-400"><UserIcon /> Moderators</h3>
            <p className="text-sm text-zinc-500 mb-4">Access to Sentry module (warn, mute, kick, ban)</p>
            <div className="flex flex-wrap gap-2">
              {modRoles.map((role) => (
                <span key={role} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm">
                  @{role}
                  <button onClick={() => setModRoles(modRoles.filter(r => r !== role))} className="hover:bg-yellow-500/20 rounded p-0.5"><XIcon /></button>
                </span>
              ))}
              <button className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm hover:bg-white/10">+ Add</button>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-cyan-400"><UserIcon /> Support Staff</h3>
            <p className="text-sm text-zinc-500 mb-4">Access to tickets (not appeals)</p>
            <div className="flex flex-wrap gap-2">
              {supportRoles.map((role) => (
                <span key={role} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm">
                  @{role}
                  <button onClick={() => setSupportRoles(supportRoles.filter(r => r !== role))} className="hover:bg-cyan-500/20 rounded p-0.5"><XIcon /></button>
                </span>
              ))}
              <button className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm hover:bg-white/10">+ Add</button>
            </div>
          </div>
        </div>

        {/* Blacklist */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-2">Ignored Channels</h3>
          <p className="text-sm text-zinc-500 mb-4">Bot will not respond to commands in these channels</p>
          <div className="flex flex-wrap gap-2">
            {ignoredChannels.map((ch) => (
              <span key={ch} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-sm">
                {ch}
                <button onClick={() => setIgnoredChannels(ignoredChannels.filter(c => c !== ch))} className="hover:bg-zinc-700 rounded p-0.5"><XIcon /></button>
              </span>
            ))}
            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm hover:bg-white/10">+ Add Channel</button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition-transform">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
