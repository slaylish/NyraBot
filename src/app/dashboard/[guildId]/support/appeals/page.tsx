'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '..' },
  { label: 'Tickets', href: '../tickets' },
  { label: 'Appeals', href: '.' },
  { label: 'Reports', href: '../reports' },
  { label: 'Surveys', href: '../surveys' },
  { label: 'Suggestions', href: '../suggestions' },
  { label: 'Messages', href: '../messages' },
  { label: 'Settings', href: '../settings' },
];

const appeals = [
  { id: 'A-001', user: 'Banned#1234', avatar: null, banReason: 'Raid participation', bannedBy: 'AutoMod', date: '5 days ago', essay: 'I was hacked and my account was used without my knowledge...' },
  { id: 'A-002', user: 'Banned#5678', avatar: null, banReason: 'Toxicity', bannedBy: 'Admin', date: '2 days ago', essay: 'I apologize for my behavior. I was having a bad day...' },
];

export default function AppealsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = appeals[currentIndex];

  const handleAction = (action: string) => {
    console.log(`${action} appeal ${current.id}`);
    if (currentIndex < appeals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Appeal Queue</h1>
          <p className="text-zinc-400">{appeals.length} appeals pending review</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 2 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {current ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Appeal Card */}
            <div className="md:col-span-2 glass rounded-2xl p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold">
                  {current.user.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{current.user}</h3>
                  <p className="text-sm text-zinc-500">Appeal #{current.id}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400">Banned</span>
                    <span className="text-xs text-zinc-500">{current.date}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm text-zinc-500 mb-2">Ban Reason</h4>
                <p className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-300">{current.banReason}</p>
                <p className="text-xs text-zinc-500 mt-2">By: {current.bannedBy}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-sm text-zinc-500 mb-2">Appeal Statement</h4>
                <p className="p-4 rounded-xl bg-white/[0.02] leading-relaxed">{current.essay}</p>
              </div>

              <div className="flex gap-4">
                <button onClick={() => handleAction('approve')} className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors">
                  ✓ Approve
                </button>
                <button onClick={() => handleAction('deny')} className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors">
                  ✕ Deny
                </button>
                <button onClick={() => handleAction('escalate')} className="px-6 py-3 rounded-xl bg-white/10 font-semibold hover:bg-white/20 transition-colors">
                  ↑ Escalate
                </button>
              </div>
            </div>

            {/* Context Sidebar */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-bold mb-4">User History</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-white/[0.02]">
                  <div className="text-zinc-500">Previous Bans</div>
                  <div className="font-medium">0</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02]">
                  <div className="text-zinc-500">Total Warnings</div>
                  <div className="font-medium">2</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02]">
                  <div className="text-zinc-500">Account Age</div>
                  <div className="font-medium">2 years</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl">
            <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
            <p className="text-zinc-500">No pending appeals to review</p>
          </div>
        )}
      </div>
    </div>
  );
}
