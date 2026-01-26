'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';

interface SupportSettingsProps {
  guildId: string;
}

export function SupportSettings({ guildId }: SupportSettingsProps) {
  const [blacklist, setBlacklist] = useState(['123456789', '987654321']);
  const [newBlacklistId, setNewBlacklistId] = useState('');

  const addBlacklist = () => {
      if (newBlacklistId) {
          setBlacklist([...blacklist, newBlacklistId]);
          setNewBlacklistId('');
      }
  };

  return (
    <div className="flex flex-col h-full space-y-6 px-8 py-8">
        <PageHeader title="Support Configuration" description="Global settings for all support modules" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transcripts */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold font-display px-1">Transcripts</h2>
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-bold">Public Transcripts</h3>
                            <p className="text-sm text-zinc-400">Allow users to view their own ticket transcripts online.</p>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="p-3 bg-surface border border-white/5 rounded-xl text-sm font-mono text-zinc-400">
                        nyra.lol/t/{'{ticket_id}'}
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-danger">Report Privacy</h3>
                            <p className="text-sm text-zinc-400">Only Admins can view Report ticket transcripts.</p>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Blacklist */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold font-display px-1">Global Blacklist</h2>
                <Card className="min-h-[300px] flex flex-col">
                    <p className="text-sm text-zinc-400 mb-4">Blocked users cannot open tickets, appeal, or send reports.</p>
                    
                    <div className="flex gap-2 mb-4">
                        <Input 
                            value={newBlacklistId}
                            onChange={e => setNewBlacklistId(e.target.value)}
                            placeholder="User ID"
                            onKeyDown={e => e.key === 'Enter' && addBlacklist()}
                        />
                        <Button onClick={addBlacklist} variant="secondary">Block</Button>
                    </div>

                    <div className="flex-1 space-y-2 overflow-y-auto max-h-[200px]">
                        {blacklist.map(id => (
                            <div key={id} className="flex justify-between items-center p-3 bg-surface border border-white/5 rounded-lg group">
                                <span className="font-mono text-sm text-zinc-300">{id}</span>
                                <button 
                                    onClick={() => setBlacklist(blacklist.filter(b => b !== id))}
                                    className="text-zinc-500 hover:text-danger opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Icons.Trash size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* On-Call Schedule */}
            <div className="lg:col-span-2 space-y-6">
                 <h2 className="text-xl font-bold font-display px-1">On-Call Schedule</h2>
                 <Card>
                     <div className="border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                         <Icons.Calendar size={48} className="text-zinc-600 mb-4" />
                         <h3 className="font-bold text-lg mb-2">Schedule Manager</h3>
                         <p className="text-zinc-500 max-w-md mb-6">
                             Define which roles are pinged for SLA breaches during specific hours. 
                             (e.g., "EU Mods" during 02:00 - 10:00 UTC).
                         </p>
                         <Button variant="secondary">Configure Calendar</Button>
                     </div>
                 </Card>
            </div>
        </div>
    </div>
  );
}
