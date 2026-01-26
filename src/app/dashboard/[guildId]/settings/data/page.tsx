'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;

const navItems = [
  { label: 'General', href: '..' },
  { label: 'Permissions', href: '../permissions' },
  { label: 'Commands', href: '../commands' },
  { label: 'Data & Privacy', href: '.' },
];

export default function DataPage() {
  const [retention, setRetention] = useState(30);
  const [logChannel, setLogChannel] = useState('#bot-logs');
  const [debugMode, setDebugMode] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Data & Privacy</h1>
          <p className="text-zinc-400">Retention settings and GDPR compliance</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 3 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Data Retention */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-2 flex items-center gap-2"><DatabaseIcon /> Data Retention</h3>
          <p className="text-sm text-zinc-500 mb-6">Control how long logs and data are stored</p>
          
          <div className="mb-6">
            <label className="block text-sm text-zinc-500 mb-2">Log Duration: <span className="text-white font-bold">{retention} days</span></label>
            <input 
              type="range" 
              min="7" 
              max="90" 
              value={retention}
              onChange={(e) => setRetention(Number(e.target.value))}
              className="w-full max-w-md accent-primary"
            />
            <div className="flex justify-between text-xs text-zinc-600 max-w-md mt-1">
              <span>7 days</span>
              <span>30 days</span>
              <span>90 days</span>
            </div>
          </div>
        </div>

        {/* Logging */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Audit Logging</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-500 mb-2">Action Log Channel</label>
              <select 
                value={logChannel}
                onChange={(e) => setLogChannel(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface border border-white/10"
              >
                <option value="#bot-logs">#bot-logs</option>
                <option value="#admin-logs">#admin-logs</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-500 mb-2">Debug Mode</label>
              <button 
                onClick={() => setDebugMode(!debugMode)}
                className={`px-4 py-3 rounded-xl transition-colors ${debugMode ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-surface border border-white/10 text-zinc-400'}`}
              >
                {debugMode ? 'Enabled (Dev Only)' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass rounded-2xl p-6 border border-red-500/20">
          <h3 className="font-bold mb-2 text-red-400 flex items-center gap-2"><TrashIcon /> Danger Zone</h3>
          <p className="text-sm text-zinc-500 mb-4">Irreversible actions for GDPR compliance</p>
          <button className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/50 font-semibold hover:bg-red-500/20 transition-colors">
            Delete All Server Data
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition-transform">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
