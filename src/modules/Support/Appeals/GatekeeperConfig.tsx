'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/icons';

interface GatekeeperConfigProps {
  guildId: string;
}

export function GatekeeperConfig({ guildId }: GatekeeperConfigProps) {
  const [minDays, setMinDays] = useState('30');
  const [strikeOut, setStrikeOut] = useState('3');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
         {/* Eligibility Rules */}
         <div className="space-y-6">
             <h2 className="text-xl font-bold font-display px-1">Eligibility Rules</h2>
             
             <Card>
                 <div className="flex items-start gap-4 mb-6">
                     <div className="bg-primary/10 p-3 rounded-xl text-primary">
                         <Icons.Clock size={24} />
                     </div>
                     <div>
                         <h3 className="font-bold">Time Served</h3>
                         <p className="text-sm text-zinc-400">Require users to wait a minimum period before appealing.</p>
                     </div>
                 </div>
                 <div className="flex items-center gap-4">
                     <Input 
                        value={minDays} 
                        onChange={e => setMinDays(e.target.value)} 
                        className="w-24 text-center font-mono" 
                     />
                     <span className="text-zinc-400">days must pass after ban</span>
                 </div>
             </Card>

             <Card>
                 <div className="flex items-start gap-4 mb-6">
                     <div className="bg-danger/10 p-3 rounded-xl text-danger">
                         <Icons.AlertTriangle size={24} />
                     </div>
                     <div>
                         <h3 className="font-bold">Strike Out</h3>
                         <p className="text-sm text-zinc-400">Automatically reject appeals from repeat offenders.</p>
                     </div>
                 </div>
                 <div className="flex items-center gap-4">
                     <span className="text-zinc-400">Reject if banned</span>
                     <Input 
                        value={strikeOut} 
                        onChange={e => setStrikeOut(e.target.value)} 
                        className="w-24 text-center font-mono" 
                     />
                     <span className="text-zinc-400">times previously</span>
                 </div>
             </Card>
         </div>

         {/* Ban Sync */}
         <div className="space-y-6">
             <h2 className="text-xl font-bold font-display px-1">Ban Sync Strategy</h2>
             
             <Card className="border-dashed bg-transparent flex flex-col items-center justify-center p-8 space-y-4">
                 <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center">
                     <Icons.Cloud size={32} className="text-zinc-500" />
                 </div>
                 <div className="text-center">
                     <h3 className="font-bold text-lg">Import Ban List</h3>
                     <p className="text-sm text-zinc-500 max-w-[200px] mx-auto">Sync existing Discord bans into the dashboard database.</p>
                 </div>
                 <Button variant="secondary" size="sm">Start Sync</Button>
             </Card>

             <Card>
                 <div className="flex items-start gap-4 mb-6">
                     <div className="bg-purple-500/10 p-3 rounded-xl text-purple-400">
                         <Icons.Users size={24} />
                     </div>
                     <div>
                         <h3 className="font-bold">Mass Amnesty</h3>
                         <p className="text-sm text-zinc-400">Upload a CSV of User IDs to unban in bulk.</p>
                     </div>
                 </div>
                 <div className="p-4 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors">
                     <span className="text-sm text-zinc-500 flex items-center gap-2">
                         <Icons.File size={16} /> Click to upload .csv
                     </span>
                 </div>
             </Card>
         </div>
    </div>
  );
}
