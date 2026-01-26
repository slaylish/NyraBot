'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '..' },
  { label: 'Tickets', href: '../tickets' },
  { label: 'Appeals', href: '../appeals' },
  { label: 'Reports', href: '../reports' },
  { label: 'Surveys', href: '../surveys' },
  { label: 'Suggestions', href: '.' },
  { label: 'Messages', href: '../messages' },
  { label: 'Settings', href: '../settings' },
];

const columns = ['Incoming', 'In Review', 'Approved', 'Implemented', 'Denied'];

const initialSuggestions = [
  { id: 1, title: 'Add music bot', author: 'User#123', votes: 24, status: 'Incoming' },
  { id: 2, title: 'Weekly events', author: 'User#456', votes: 18, status: 'In Review' },
  { id: 3, title: 'More roles', author: 'User#789', votes: 12, status: 'Approved' },
  { id: 4, title: 'Dark mode embed', author: 'User#012', votes: 8, status: 'Incoming' },
];

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-full mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Suggestion Box</h1>
          <p className="text-zinc-400">Kanban board for community ideas</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 5 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => (
            <div key={col} className="min-w-[280px] flex-shrink-0">
              <div className="p-3 rounded-t-xl bg-white/5 font-medium text-sm flex items-center justify-between">
                {col}
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-xs">{suggestions.filter(s => s.status === col).length}</span>
              </div>
              <div className="min-h-[400px] p-3 rounded-b-xl bg-white/[0.02] space-y-3">
                {suggestions.filter(s => s.status === col).map((s) => (
                  <div key={s.id} className="p-4 rounded-xl glass cursor-grab hover:bg-white/[0.04] transition-colors">
                    <h4 className="font-medium mb-2">{s.title}</h4>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{s.author}</span>
                      <span className="text-yellow-400">▲ {s.votes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Settings</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
              <div><div className="font-medium">Anonymous Mode</div><div className="text-sm text-zinc-500">Hide suggestion authors</div></div>
              <div className="w-12 h-6 rounded-full bg-zinc-700 relative"><div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white" /></div>
            </label>
            <label className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
              <div><div className="font-medium">Auto-delete at -5</div><div className="text-sm text-zinc-500">Remove heavily downvoted ideas</div></div>
              <div className="w-12 h-6 rounded-full bg-green-500 relative"><div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" /></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
