'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

const navItems = [
  { label: 'General', href: '..' },
  { label: 'Permissions', href: '../permissions' },
  { label: 'Commands', href: '.' },
  { label: 'Data & Privacy', href: '../data' },
];

const commands = [
  { name: '/kick', module: 'Sentry', enabled: true, permission: 'Moderator' },
  { name: '/ban', module: 'Sentry', enabled: true, permission: 'Moderator' },
  { name: '/mute', module: 'Sentry', enabled: true, permission: 'Moderator' },
  { name: '/warn', module: 'Sentry', enabled: true, permission: 'Moderator' },
  { name: '/purge', module: 'Sentry', enabled: true, permission: 'Moderator' },
  { name: '/lockdown', module: 'Sentry', enabled: true, permission: 'Admin' },
  { name: '/slowmode', module: 'Sentry', enabled: true, permission: 'Moderator' },
  { name: '/ticket', module: 'Support', enabled: true, permission: 'Everyone' },
  { name: '/appeal', module: 'Support', enabled: true, permission: 'Everyone' },
  { name: '/suggest', module: 'Support', enabled: true, permission: 'Everyone' },
  { name: '/rank', module: 'Leveling', enabled: false, permission: 'Everyone' },
  { name: '/balance', module: 'Economy', enabled: true, permission: 'Everyone' },
];

export default function CommandsPage() {
  const [search, setSearch] = useState('');
  const [cmdStates, setCmdStates] = useState<Record<string, boolean>>(
    Object.fromEntries(commands.map(c => [c.name, c.enabled]))
  );

  const filtered = commands.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleCmd = (name: string) => {
    setCmdStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Command Management</h1>
          <p className="text-zinc-400">Enable, disable, or override command permissions</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 2 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><SearchIcon /></div>
          <input
            type="text"
            placeholder="Search commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Commands List */}
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400 font-medium">
              <tr>
                <th className="p-4">Command</th>
                <th className="p-4">Module</th>
                <th className="p-4">Required Permission</th>
                <th className="p-4 text-right">Enabled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((cmd) => (
                <tr key={cmd.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-white">{cmd.name}</td>
                  <td className="p-4 text-zinc-500">{cmd.module}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      cmd.permission === 'Admin' ? 'bg-red-500/20 text-red-400' :
                      cmd.permission === 'Moderator' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>{cmd.permission}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => toggleCmd(cmd.name)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${cmdStates[cmd.name] ? 'bg-green-500' : 'bg-zinc-700'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${cmdStates[cmd.name] ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition-transform">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
