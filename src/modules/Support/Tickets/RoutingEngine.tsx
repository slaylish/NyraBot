'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { ChannelPicker } from '@/components/ui/ChannelPicker';

interface RoutingEngineProps {
  guildId: string;
}

const MODES = [
  { id: 'free', label: 'Free For All', desc: 'First staff to click "Claim" gets the ticket.', icon: Icons.Grid },
  { id: 'round_robin', label: 'Round Robin', desc: 'Automatically rotates assignment among online staff.', icon: Icons.Clock },
  { id: 'skill', label: 'Skill Based', desc: 'Routes "Billing" to Admins, "Report" to Mods.', icon: Icons.TrendUp },
];

export function RoutingEngine({ guildId }: RoutingEngineProps) {
  const [activeMode, setActiveMode] = useState('free');
  // Mock rule state
  const [rules, setRules] = useState([
     { id: 1, tag: 'Billing', target: 'Admin' },
     { id: 2, tag: 'Urgent', target: 'Senior Mod' }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Assignment Mode */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold font-display px-1">Assignment Mode</h2>
            <div className="space-y-3">
                {MODES.map(mode => (
                    <Card 
                        key={mode.id} 
                        onClick={() => setActiveMode(mode.id)}
                        className={cn(
                            "cursor-pointer transition-all hover:scale-[1.02]",
                            activeMode === mode.id ? "border-primary bg-primary/5 shadow-[0_0_20px_-10px_var(--primary)]" : "opacity-80 hover:opacity-100"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn("p-3 rounded-xl", activeMode===mode.id ? "bg-primary text-white" : "bg-white/5 text-zinc-400")}>
                                <mode.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{mode.label}</h3>
                                <p className="text-sm text-zinc-400">{mode.desc}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="pt-6">
                <h2 className="text-xl font-bold font-display px-1 mb-4">SLA Watchdog</h2>
                <Card className="space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <Label>Yellow Alert</Label>
                             <div className="flex items-center gap-2">
                                <Input placeholder="30" className="w-20 text-center font-mono" />
                                <span className="text-sm text-zinc-500">min unassigned</span>
                             </div>
                         </div>
                         <div>
                             <Label>Action</Label>
                             <select className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-zinc-300">
                                 <option>Ping On-Call</option>
                                 <option>Ping Moderators</option>
                             </select>
                         </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <Label>Red Alert</Label>
                             <div className="flex items-center gap-2">
                                <Input placeholder="120" className="w-20 text-center font-mono" />
                                <span className="text-sm text-zinc-500">min unassigned</span>
                             </div>
                         </div>
                         <div>
                             <Label>Action</Label>
                             <select className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-zinc-300">
                                 <option>DM Owner</option>
                                 <option>Ping @everyone</option>
                             </select>
                         </div>
                     </div>
                </Card>
            </div>
        </div>

        {/* Skill Based Rules (conditional) */}
        <div className={cn("space-y-6 transition-opacity", activeMode === 'skill' ? "opacity-100" : "opacity-50 pointer-events-none grayscale")}>
             <div className="flex justify-between items-center px-1">
                 <h2 className="text-xl font-bold font-display">Routing Rules</h2>
                 <Button size="sm" variant="secondary">+ New Rule</Button>
             </div>
             
             <Card className="min-h-[400px]">
                 {rules.map(rule => (
                     <div key={rule.id} className="flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg">
                         <div className="flex items-center gap-3">
                             <div className="px-2 py-1 bg-surface rounded text-xs font-mono text-zinc-400 border border-white/10">IF Tag IS</div>
                             <span className="font-bold text-white bg-primary/20 px-2 py-1 rounded text-xs text-primary">{rule.tag}</span>
                             <div className="px-2 py-1 bg-surface rounded text-xs font-mono text-zinc-400 border border-white/10">THEN Assign</div>
                             <span className="font-bold text-white bg-indigo-500/20 px-2 py-1 rounded text-xs text-indigo-400">{rule.target}</span>
                         </div>
                         <button className="text-zinc-500 hover:text-danger hover:bg-danger/10 p-1 rounded transition-colors"><Icons.X size={14} /></button>
                     </div>
                 ))}
                 
                 {activeMode !== 'skill' && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-[24px]">
                         <div className="text-center">
                             <Icons.Lock size={40} className="mx-auto mb-2 text-zinc-500" />
                             <p className="font-bold text-zinc-400">Enable Skill Based Mode to configure</p>
                         </div>
                     </div>
                 )}
             </Card>
        </div>
    </div>
  );
}
