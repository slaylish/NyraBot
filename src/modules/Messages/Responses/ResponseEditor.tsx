'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { EmbedEditor } from '../components/EmbedEditor';
import { EmbedData, ActionRow } from '../types';
import { ChannelPicker } from '@/components/ui/ChannelPicker';

interface ResponseEditorProps {
  guildId: string;
}

const EVENTS = [
  { id: 'welcome', label: 'Welcome Message', icon: Icons.UserPlus, desc: 'Sent when a user joins' },
  { id: 'goodbye', label: 'Goodbye Message', icon: Icons.UserMinus, desc: 'Sent when a user leaves' },
  { id: 'boost', label: 'Server Boost', icon: Icons.TrendUp, desc: 'Sent when someone boosts' }, 
  { id: 'ban', label: 'Ban DM', icon: Icons.Gavel, desc: 'Sent to user when banned' },
];

export function ResponseEditor({ guildId }: ResponseEditorProps) {
  const [activeEvent, setActiveEvent] = useState(EVENTS[0].id);
  const [data, setData] = useState<any>({}); // { welcome: { enabled, flow... } }
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Current event state
  const current = data[activeEvent] || { enabled: false, channelId: '', message: { embed: { fields: [] }, components: [] } };

  useEffect(() => {
    fetch(`/api/guilds/${guildId}/responses`)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, [guildId]);

  const updateCurrent = (key: string, val: any) => {
    const newData = { ...data, [activeEvent]: { ...current, [key]: val } };
    setData(newData);
  };

  const updateMessage = (msgVal: { embed: EmbedData, components: ActionRow[] }) => {
    // We store 'embed' and 'components' directly or wrapper 'message'?
    // Schema says "message: Object". Let's store { embed, components, content }
    updateCurrent('message', msgVal);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/responses`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ type: activeEvent, data: current })
      });
      if (res.ok) setMessage('Saved!');
      else setMessage('Error saving');
    } catch { setMessage('Error saving'); }
    setTimeout(() => setMessage(''), 3000);
    setSaving(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const currentEventDef = EVENTS.find(e => e.id === activeEvent)!;

  return (
    <div className="flex-1 flex h-[calc(100vh-140px)]"> 
       {/* Sidebar */}
       <div className="w-64 border-r border-white/5 p-4 space-y-2">
          {EVENTS.map(e => (
             <button
                key={e.id}
                onClick={() => setActiveEvent(e.id)}
                className={cn(
                   "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                   activeEvent === e.id ? "bg-primary text-white" : "bg-transparent text-zinc-400 hover:bg-white/5"
                )}
             >
                <div className={cn("p-2 rounded-lg bg-black/20", activeEvent === e.id ? "text-white" : "text-zinc-500")}>
                   <e.icon size={16} />
                </div>
                <div>
                   <div className="font-bold text-sm">{e.label}</div>
                   <div className={cn("text-[10px]", activeEvent===e.id?"text-white/70":"text-zinc-600")}>{e.desc}</div>
                </div>
             </button>
          ))}
       </div>

       {/* Editor Area */}
       <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
             <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary border border-white/5">
                    <currentEventDef.icon size={24} />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold font-display">{currentEventDef.label}</h2>
                    <p className="text-xs text-zinc-400">Configure automated response</p>
                 </div>
             </div>
             
             <div className="flex items-center gap-4">
                 <label className="flex items-center gap-3 cursor-pointer bg-surface px-4 py-2 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                     <input type="checkbox" checked={current.enabled || false} onChange={e => updateCurrent('enabled', e.target.checked)} className="peer" />
                     <span className="text-sm font-bold text-zinc-400 peer-checked:text-emerald-400 transition-colors">
                        {current.enabled ? 'Enabled' : 'Disabled'}
                     </span>
                 </label>
                 
                 <Button onClick={save} disabled={saving} glow>
                     {saving ? 'Saving...' : 'Save Changes'}
                 </Button>
             </div>
          </div>
          
          {message && <div className="mb-4 text-emerald-400 text-sm text-center font-bold px-4 py-2 bg-emerald-400/10 rounded-lg">{message}</div>}

          <div className="flex-1 overflow-y-auto">
             <div className="mb-6 max-w-md">
                 <Label>Channel ID</Label>
                 <ChannelPicker 
                    guildId={guildId}
                    value={current.channelId || ''} 
                    onChange={val => updateCurrent('channelId', val)} 
                    placeholder="Where to send this message"
                 />
                 <p className="text-xs text-zinc-500 mt-1">Leave empty to send to system channel (if applicable) or default.</p>
             </div>
             
             <div className="border border-white/5 rounded-2xl p-6 bg-black/20">
                 <h3 className="font-bold mb-4 text-sm text-zinc-400 uppercase tracking-wider">Message Content</h3>
                 <EmbedEditor 
                    value={current.message || { embed: { fields: [] }, components: [] }} 
                    onChange={updateMessage} 
                 />
             </div>
          </div>
       </div>
    </div>
  );
}
