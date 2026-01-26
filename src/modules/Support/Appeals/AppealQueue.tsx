'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/ui/PageHeader';

interface AppealQueueProps {
  guildId: string;
}

const APPEALS = [
    { id: 'APP-001', user: 'banned_guy', avatar: '', reason: 'I am sorry, my brother used my keyboard.', banDate: '2 days ago', status: 'Pending' },
    { id: 'APP-002', user: 'spammer_123', avatar: '', reason: 'Unban me now or else', banDate: '5 hours ago', status: 'Pending' },
];

export function AppealQueue({ guildId }: AppealQueueProps) {
  const [selectedAppeal, setSelectedAppeal] = useState(APPEALS[0]);

  return (
    <div className="flex flex-col h-full space-y-6">
        <PageHeader title="Appeal Center" description="Review and manage ban appeals" />

        <div className="flex flex-1 gap-6 overflow-hidden">
            {/* List */}
            <div className="w-80 flex-shrink-0 overflow-y-auto space-y-3">
                {APPEALS.map(appeal => (
                    <div 
                        key={appeal.id}
                        onClick={() => setSelectedAppeal(appeal)}
                        className={cn(
                            "p-4 rounded-xl border cursor-pointer transition-all",
                            selectedAppeal.id === appeal.id 
                                ? "bg-primary/10 border-primary/50" 
                                : "bg-surface border-white/5 hover:bg-surface-hover"
                        )}
                    >
                        <div className="flex justify-between items-center mb-2">
                             <span className="font-bold text-sm text-white">{appeal.user}</span>
                             <span className="text-[10px] text-zinc-500">{appeal.banDate}</span>
                        </div>
                        <div className="text-xs text-zinc-400 line-clamp-2">{appeal.reason}</div>
                    </div>
                ))}
            </div>

            {/* Detail View */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                <Card className="p-6 bg-[#18181b] border-white/10">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold">
                                {selectedAppeal.user.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{selectedAppeal.user}</h2>
                                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                    <span>#{selectedAppeal.id}</span>
                                    <span>•</span>
                                    <span>ID: 981273918273</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="text-danger hover:text-danger hover:bg-danger/10">Deny</Button>
                            <Button className="bg-emerald-500 hover:bg-emerald-600">Approve Appeal</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Appeal Content */}
                        <div className="col-span-2 space-y-6">
                            <div>
                                <h3 className="font-bold text-zinc-400 mb-2 uppercase text-xs tracking-wider">Appeal Statement</h3>
                                <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-zinc-300 italic">
                                    "{selectedAppeal.reason}"
                                </div>
                            </div>
                             
                            <div>
                                <h3 className="font-bold text-zinc-400 mb-2 uppercase text-xs tracking-wider">Chat Snapshot (Pre-Ban)</h3>
                                <div className="space-y-2">
                                    <div className="flex gap-2 text-sm opacity-50">
                                        <span className="text-zinc-500 w-16">10:41 AM</span>
                                        <span className="font-bold text-zinc-400">{selectedAppeal.user}:</span>
                                        <span className="text-zinc-500">Hello?</span>
                                    </div>
                                    <div className="flex gap-2 text-sm opacity-50">
                                        <span className="text-zinc-500 w-16">10:42 AM</span>
                                        <span className="font-bold text-zinc-400">{selectedAppeal.user}:</span>
                                        <span className="text-zinc-500">Is anyone there?</span>
                                    </div>
                                    <div className="flex gap-2 text-sm text-danger bg-danger/5 p-1 rounded -mx-1">
                                        <span className="text-danger/50 w-16">10:43 AM</span>
                                        <span className="font-bold text-danger">{selectedAppeal.user}:</span>
                                        <span className="text-danger">SPAM SPAM SPAM SPAM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Criminal Record */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-zinc-400 mb-2 uppercase text-xs tracking-wider">Criminal Record</h3>
                            <div className="space-y-2">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-orange-400 text-xs">WARN</span>
                                        <span className="text-[10px] text-zinc-600">2 months ago</span>
                                    </div>
                                    <div className="text-xs text-zinc-400">Spamming in general</div>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-yellow-400 text-xs">MUTE</span>
                                        <span className="text-[10px] text-zinc-600">1 month ago</span>
                                    </div>
                                    <div className="text-xs text-zinc-400">Mic spam</div>
                                </div>
                                 <div className="p-3 bg-danger/10 rounded-lg border border-danger/20">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-danger text-xs">BAN</span>
                                        <span className="text-[10px] text-danger/50">2 days ago</span>
                                    </div>
                                    <div className="text-xs text-zinc-300">Mass spamming channels</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
}
