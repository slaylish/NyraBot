'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils'; // Assuming this utility exists

interface ReportTriageProps {
  guildId: string;
}

const REPORTS = [
  { id: 'REP-882', reporter: 'Anonymous #12', target: 'bad_actor_99', type: 'Harassment', status: 'New', time: '10m ago', validity: 'Unverified' },
  { id: 'REP-881', reporter: 'Anonymous #05', target: 'spammer_x', type: 'Spam', status: 'Investigating', time: '1h ago', validity: 'Helpful' },
  { id: 'REP-880', reporter: 'Anonymous #99', target: 'innocent_user', type: 'Other', status: 'Dismissed', time: '2h ago', validity: 'False Alarm' },
];

export function ReportTriage({ guildId }: ReportTriageProps) {
  const [selectedReport, setSelectedReport] = useState(REPORTS[0]);

  return (
    <div className="flex flex-col h-full space-y-6">
        <PageHeader title="Whistleblower" description="Secure and anonymous reporting pipeline" />

        <div className="flex flex-1 gap-6 overflow-hidden">
             {/* List */}
            <div className="w-80 flex-shrink-0 overflow-y-auto space-y-3">
                {REPORTS.map(report => (
                    <div 
                        key={report.id}
                        onClick={() => setSelectedReport(report)}
                        className={cn(
                            "p-4 rounded-xl border cursor-pointer transition-all",
                            selectedReport.id === report.id 
                                ? "bg-primary/10 border-primary/50" 
                                : "bg-surface border-white/5 hover:bg-surface-hover"
                        )}
                    >
                        <div className="flex justify-between items-center mb-1">
                             <div className="flex items-center gap-2">
                                 <Icons.Shield size={12} className="text-zinc-500" />
                                 <span className="font-bold text-xs text-zinc-400">{report.reporter}</span>
                             </div>
                             <span className="text-[10px] text-zinc-600">{report.time}</span>
                        </div>
                        <div className="font-bold text-sm text-white mb-1">Report: {report.target}</div>
                        <div className="flex gap-2">
                             <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-zinc-400">{report.type}</span>
                             <span className={cn(
                                 "text-[10px] px-2 py-0.5 rounded",
                                 report.validity === 'Helpful' ? "text-emerald-400 bg-emerald-400/10" :
                                 report.validity === 'False Alarm' ? "text-orange-400 bg-orange-400/10" :
                                 "text-zinc-500 bg-zinc-500/10"
                             )}>{report.validity}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Area */}
            <div className="flex-1 overflow-y-auto pr-2">
                <Card className="h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                         <div>
                             <h2 className="text-xl font-bold flex items-center gap-3">
                                 Case {selectedReport.id}
                                 <span className="text-xs font-normal bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">{selectedReport.status}</span>
                             </h2>
                             <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                                 <span>Type: <strong className="text-white">{selectedReport.type}</strong></span>
                                 <span>•</span>
                                 <span>Reported User: <strong className="text-danger">{selectedReport.target}</strong></span>
                             </div>
                         </div>
                         <div className="flex items-center gap-2">
                             <Button size="sm" variant="secondary" className="border-danger/20 text-danger hover:bg-danger/10">Block Reporter</Button>
                             <Button size="sm" variant="secondary">Mark Resolved</Button>
                         </div>
                    </div>

                    <div className="flex-1 space-y-8">
                         <div>
                             <h3 className="uppercase text-xs font-bold text-zinc-500 mb-2">Evidence Snapshot</h3>
                             <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-sm space-y-2">
                                 <div className="flex gap-2 opacity-50">
                                     <span className="text-zinc-500 w-16">10:41 AM</span>
                                     <span className="font-bold text-zinc-400">innocent_user:</span>
                                     <span className="text-zinc-500">Hey everyone, how's it going?</span>
                                 </div>
                                 <div className="flex gap-2 bg-danger/10 p-1 -mx-1 rounded">
                                     <span className="text-danger/50 w-16">10:42 AM</span>
                                     <span className="font-bold text-danger">{selectedReport.target}:</span>
                                     <span className="text-danger"> [Deleted Message content preserved by Bot] </span>
                                 </div>
                             </div>
                         </div>

                         <div>
                             <h3 className="uppercase text-xs font-bold text-zinc-500 mb-2">Validity Scoring</h3>
                             <div className="grid grid-cols-3 gap-4">
                                 <button className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 flex flex-col items-center gap-2 transition-colors">
                                     <Icons.CheckCircle size={24} />
                                     <span className="font-bold text-sm">Helpful</span>
                                 </button>
                                 <button className="p-4 rounded-xl border border-white/5 bg-surface hover:bg-surface-hover text-zinc-400 flex flex-col items-center gap-2 transition-colors">
                                     <Icons.MinusCircle size={24} />
                                     <span className="font-bold text-sm">Neutral</span>
                                 </button>
                                 <button className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 flex flex-col items-center gap-2 transition-colors">
                                     <Icons.AlertOctagon size={24} />
                                     <span className="font-bold text-sm">Malicious</span>
                                 </button>
                             </div>
                             <p className="text-xs text-zinc-500 mt-2 text-center">
                                 Marking as "Malicious" increases the reporters strike count.
                             </p>
                         </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
}
