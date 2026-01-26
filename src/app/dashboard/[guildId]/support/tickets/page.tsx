'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '..' },
  { label: 'Tickets', href: '.' },
  { label: 'Appeals', href: '../appeals' },
  { label: 'Reports', href: '../reports' },
  { label: 'Surveys', href: '../surveys' },
  { label: 'Suggestions', href: '../suggestions' },
  { label: 'Messages', href: '../messages' },
  { label: 'Settings', href: '../settings' },
];

const tickets = [
  { id: 'T-001', user: 'User#1234', status: 'Open', category: 'Bug Report', staff: null, created: '5m ago' },
  { id: 'T-002', user: 'User#5678', status: 'In Progress', category: 'Billing', staff: 'Admin', created: '1h ago' },
  { id: 'T-003', user: 'User#9012', status: 'Awaiting User', category: 'General', staff: 'Mod1', created: '3h ago' },
];

const statusColors: Record<string, string> = {
  'Open': 'bg-blue-500/20 text-blue-400',
  'In Progress': 'bg-yellow-500/20 text-yellow-400',
  'Awaiting User': 'bg-purple-500/20 text-purple-400',
  'Closed': 'bg-zinc-800 text-zinc-400',
};

export default function TicketsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Ticket Center</h1>
          <p className="text-zinc-400">Manage support tickets from your community</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 1 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {['all', 'open', 'in progress', 'closed'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-primary text-white' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tickets Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned</th>
                <th className="p-4">Created</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-xs">{t.id}</td>
                  <td className="p-4 font-medium">{t.user}</td>
                  <td className="p-4 text-zinc-400">{t.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${statusColors[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="p-4 text-zinc-400">{t.staff || '—'}</td>
                  <td className="p-4 text-zinc-500">{t.created}</td>
                  <td className="p-4">
                    <button className="px-3 py-1 rounded-lg bg-white/5 text-xs hover:bg-white/10">Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel Config */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Ticket Panels</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['General Support', 'Billing', 'Bug Report'].map((panel) => (
              <div key={panel} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="font-medium mb-2">{panel}</h4>
                <p className="text-xs text-zinc-500 mb-3">Pings: @Support Staff</p>
                <button className="text-xs text-primary hover:underline">Edit Panel</button>
              </div>
            ))}
            <button className="p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 text-zinc-500 hover:text-white transition-colors">
              + Create Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
