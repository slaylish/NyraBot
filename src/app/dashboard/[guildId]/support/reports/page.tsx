'use client';
import React from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '..' },
  { label: 'Tickets', href: '../tickets' },
  { label: 'Appeals', href: '../appeals' },
  { label: 'Reports', href: '.' },
  { label: 'Surveys', href: '../surveys' },
  { label: 'Suggestions', href: '../suggestions' },
  { label: 'Messages', href: '../messages' },
  { label: 'Settings', href: '../settings' },
];

const reports = [
  { id: 'R-001', reporter: 'Anonymous', target: 'User#1234', message: 'This is offensive content...', channel: '#general', status: 'Pending', time: '10m ago' },
  { id: 'R-002', reporter: 'User#5678', target: 'User#9999', message: 'Spam links being posted', channel: '#announcements', status: 'Valid', time: '1h ago' },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">User Reports</h1>
          <p className="text-zinc-400">Review misconduct reports from your community</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 3 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400"><tr>
              <th className="p-4">ID</th>
              <th className="p-4">Reporter</th>
              <th className="p-4">Target</th>
              <th className="p-4">Message</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-xs">{r.id}</td>
                  <td className="p-4 text-zinc-400">{r.reporter}</td>
                  <td className="p-4 font-medium">{r.target}</td>
                  <td className="p-4 text-zinc-400 max-w-xs truncate">{r.message}</td>
                  <td className="p-4 text-zinc-500">{r.channel}</td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${r.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{r.status}</span></td>
                  <td className="p-4 flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs">Valid</button>
                    <button className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs">False</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
