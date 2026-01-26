'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Icons
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const GavelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6-4 4z"/></svg>
);
const UserXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/></svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

type Status = 'green' | 'yellow' | 'red';

function TrafficLight({ status, onChange }: { status: Status; onChange: (s: Status) => void }) {
  const label: Record<Status, string> = {
    green: 'System Normal',
    yellow: 'Elevated Activity',
    red: 'Lockdown Active'
  };

  return (
    <Card className="flex items-center gap-4">
      <div className="flex gap-2">
        {(['red', 'yellow', 'green'] as Status[]).map(s => (
          <button 
            key={s}
            onClick={() => onChange(s)}
            className={`w-4 h-4 rounded-full transition-all ${status === s ? `bg-${s}-500 scale-125` : 'bg-surface-hover'}`}
            style={{ backgroundColor: status === s ? (s === 'red' ? '#ef4444' : s === 'yellow' ? '#eab308' : '#22c55e') : undefined }}
          />
        ))}
      </div>
      <div>
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest">DEFCON</div>
        <div className={`font-bold ${status === 'green' ? 'text-green-400' : status === 'yellow' ? 'text-yellow-400' : 'text-red-400'}`}>
          {label[status]}
        </div>
      </div>
    </Card>
  );
}

function MetricsCard({ title, value, trend, icon, color }: { title: string; value: string; trend: string; icon: React.ReactNode; color: string }) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-zinc-500 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-surface-hover ${color}`}>{icon}</div>
      </div>
      <div className="text-xs font-mono">
        <span className="text-emerald-400">{trend}</span>
        <span className="text-zinc-500"> vs last 24h</span>
      </div>
    </Card>
  );
}

function EmergencyControl({ icon, title, description, enabled, onToggle }: { icon: React.ReactNode; title: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <Card className={enabled ? 'border-danger/50 bg-danger/5' : ''}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${enabled ? 'bg-danger/20 text-danger' : 'bg-surface-hover text-zinc-400'}`}>{icon}</div>
          <h4 className="font-semibold">{title}</h4>
        </div>
        <button 
          onClick={onToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-danger' : 'bg-zinc-700'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'left-7' : 'left-1'}`} />
        </button>
      </div>
      <p className="text-sm text-zinc-500">{description}</p>
    </Card>
  );
}

export default function SentryHUD() {
  const [status, setStatus] = useState<Status>('green');
  const [lockdown, setLockdown] = useState(false);
  const [joinGate, setJoinGate] = useState(false);
  const [slowmode, setSlowmode] = useState(0);

  return (
    <div className="flex min-h-screen bg-background font-sans text-white">
      <DashboardSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sentry</h1>
            <p className="text-zinc-400">Moderation Command Center</p>
          </div>
          <TrafficLight status={status} onChange={setStatus} />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricsCard title="Total Actions" value="1,284" trend="+12%" icon={<GavelIcon />} color="text-blue-400" />
          <MetricsCard title="Auto-Mod Triggers" value="42" trend="-5%" icon={<ShieldIcon />} color="text-yellow-400" />
          <MetricsCard title="Active Bans" value="89" trend="+2" icon={<UserXIcon />} color="text-red-400" />
          <MetricsCard title="Pending Appeals" value="3" trend="0" icon={<ClockIcon />} color="text-purple-400" />
        </div>

        {/* Emergency Controls */}
        <Card className="mb-8">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-danger">⚠</span> Emergency Controls
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <EmergencyControl
              icon={<LockIcon />}
              title="Server Lockdown"
              description="Instantly deny SEND_MESSAGES in all public channels"
              enabled={lockdown}
              onToggle={() => setLockdown(!lockdown)}
            />
            <EmergencyControl
              icon={<ShieldIcon />}
              title="Join Gate"
              description="Require phone verification for new members"
              enabled={joinGate}
              onToggle={() => setJoinGate(!joinGate)}
            />
            <Card className="bg-surface-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-surface text-zinc-400"><ClockIcon /></div>
                <h4 className="font-semibold">Global Slowmode</h4>
              </div>
              <input 
                type="range" 
                min="0" 
                max="60" 
                value={slowmode}
                onChange={(e) => setSlowmode(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm text-zinc-500 mt-2">{slowmode === 0 ? 'Disabled' : `${slowmode} seconds`}</p>
            </Card>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h3 className="font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'BAN', user: 'Spammer#1234', mod: 'AutoMod', time: '2m ago', reason: 'Raid velocity exceeded' },
              { action: 'MUTE', user: 'Troll#5678', mod: 'Admin', time: '15m ago', reason: 'Toxicity' },
              { action: 'WARN', user: 'Newbie#0000', mod: 'Mod1', time: '1h ago', reason: 'Link spam' },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-surface-hover hover:bg-white/5 transition-colors">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  log.action === 'BAN' ? 'bg-danger/20 text-danger' :
                  log.action === 'MUTE' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                }`}>{log.action}</span>
                <span className="font-medium flex-1">{log.user}</span>
                <span className="text-zinc-500 text-sm">{log.reason}</span>
                <span className="text-zinc-600 text-xs">{log.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
