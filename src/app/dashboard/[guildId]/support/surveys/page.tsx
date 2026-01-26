'use client';
import React from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '..' },
  { label: 'Tickets', href: '../tickets' },
  { label: 'Appeals', href: '../appeals' },
  { label: 'Reports', href: '../reports' },
  { label: 'Surveys', href: '.' },
  { label: 'Suggestions', href: '../suggestions' },
  { label: 'Messages', href: '../messages' },
  { label: 'Settings', href: '../settings' },
];

export default function SurveysPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors mb-4 inline-block">← Back to Servers</Link>
          <h1 className="text-3xl font-bold mb-2">Surveys & Feedback</h1>
          <p className="text-zinc-400">Track community satisfaction</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 4 ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4">Post-Ticket CSAT</h3>
            <div className="text-5xl font-bold text-yellow-400 mb-2">4.6★</div>
            <p className="text-sm text-zinc-500">Average rating from 127 responses</p>
            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm w-4">{star}★</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4">NPS Score</h3>
            <div className="text-5xl font-bold text-green-400 mb-2">+42</div>
            <p className="text-sm text-zinc-500">Net Promoter Score (Last 30 Days)</p>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div className="p-3 rounded-xl bg-green-500/10"><div className="text-lg font-bold text-green-400">62%</div><div className="text-xs text-zinc-500">Promoters</div></div>
              <div className="p-3 rounded-xl bg-zinc-800"><div className="text-lg font-bold">18%</div><div className="text-xs text-zinc-500">Passive</div></div>
              <div className="p-3 rounded-xl bg-red-500/10"><div className="text-lg font-bold text-red-400">20%</div><div className="text-xs text-zinc-500">Detractors</div></div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Configure</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
              <div><div className="font-medium">Post-Ticket Survey</div><div className="text-sm text-zinc-500">Ask for rating after ticket closes</div></div>
              <div className="w-12 h-6 rounded-full bg-green-500 relative"><div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" /></div>
            </label>
            <label className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02]">
              <div><div className="font-medium">Monthly NPS</div><div className="text-sm text-zinc-500">DM 5% of active members monthly</div></div>
              <div className="w-12 h-6 rounded-full bg-zinc-700 relative"><div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white" /></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
