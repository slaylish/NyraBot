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
  { label: 'Messages', href: '.' },
  { label: 'Settings', href: '../settings' },
];

export default function MessagesPage() {
  const [selectedModule, setSelectedModule] = useState('support');

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Message Control</h1>
          <p className="text-zinc-400">Customize bot responses and create embeds</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 6 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Module Selector */}
        <div className="flex gap-2">
          {['support', 'moderation', 'welcome', 'leveling'].map((m) => (
            <button key={m} onClick={() => setSelectedModule(m)} className={`px-4 py-2 rounded-lg text-sm capitalize ${selectedModule === m ? 'bg-primary text-white' : 'bg-white/5 text-zinc-400'}`}>
              {m}
            </button>
          ))}
        </div>

        {/* Message Editor */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4">Edit Messages</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Ticket Welcome</label>
                <textarea className="w-full h-24 p-3 rounded-xl bg-surface border border-white/10 resize-none" defaultValue="Welcome {user.mention}! A staff member will be with you shortly." />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Ticket Close</label>
                <textarea className="w-full h-24 p-3 rounded-xl bg-surface border border-white/10 resize-none" defaultValue="This ticket has been closed. Thank you for contacting support!" />
              </div>
              <div className="text-xs text-zinc-600">
                Variables: {'{user.mention}'}, {'{user.name}'}, {'{ticket.id}'}, {'{server.name}'}
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4">Embed Builder</h3>
            <div className="p-4 rounded-xl bg-[#2f3136] border-l-4 border-primary">
              <div className="text-primary font-bold mb-2">Title</div>
              <div className="text-sm text-zinc-300 mb-4">Description text goes here...</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-zinc-500">Field:</span> Value</div>
                <div><span className="text-zinc-500">Field:</span> Value</div>
              </div>
              <div className="mt-4 text-xs text-zinc-500">Footer text</div>
            </div>
            <Link href="messages/builder" className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm">
              Open Builder →
            </Link>
          </div>
        </div>

        {/* Broadcast */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Broadcast Manager</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-zinc-500 mb-2">Channel</label>
              <select className="w-full p-3 rounded-xl bg-surface border border-white/10">
                <option>#announcements</option>
                <option>#general</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-500 mb-2">Schedule</label>
              <input type="datetime-local" className="w-full p-3 rounded-xl bg-surface border border-white/10" />
            </div>
            <div className="flex items-end">
              <button className="w-full py-3 rounded-xl bg-white text-black font-bold">Send Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
