'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { WebTicket } from '@/modules/Support/types';

interface OmniInboxProps {
  guildId: string;
}

// Mock Ticket Data
const TICKETS: WebTicket[] = [
    { ticketId: '1042', subject: 'Appeal Ban', status: 'Open', priority: 'High', user: { id: '1', username: 'xQc_OW', avatar: '1' }, messages: [
        { id: '1', content: 'Why was I banned?', author: { username: 'xQc_OW', isStaff: false }, timestamp: new Date(Date.now() - 3600000) }
    ]},
    { ticketId: '1041', subject: 'Billing Issue', status: 'InProgress', priority: 'Medium', user: { id: '2', username: 'pokimane', avatar: '2' }, messages: [] },
    { ticketId: '1040', subject: 'Report User', status: 'Closed', priority: 'Low', user: { id: '3', username: 'shroud', avatar: '3' }, messages: [] },
];

export function OmniInbox({ guildId }: OmniInboxProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string>('1042');
  const activeTicket = TICKETS.find(t => t.ticketId === selectedTicketId);

  return (
    <div className="flex h-full gap-4 relative">
        {/* Ticket List */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-3">
             <div className="flex items-center justify-between pb-2 border-b border-white/5">
                 <h2 className="font-bold text-zinc-300">Active Queue</h2>
                 <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">3 Open</span>
             </div>
             
             {TICKETS.map(ticket => (
                 <div 
                    key={ticket.ticketId}
                    onClick={() => setSelectedTicketId(ticket.ticketId)}
                    className={cn(
                        "p-4 rounded-xl cursor-pointer border transition-all hover:bg-white/5",
                        selectedTicketId === ticket.ticketId ? "bg-white/[0.08] border-primary/50" : "bg-surface border-transparent"
                    )}
                 >
                     <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold">
                                 {ticket.user.username.charAt(0)}
                             </div>
                             <span className="font-bold text-sm truncate max-w-[100px]">{ticket.user.username}</span>
                         </div>
                         <span className={cn(
                             "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded",
                             ticket.priority === 'High' ? 'bg-danger/20 text-danger' : 'bg-zinc-600/20 text-zinc-400'
                         )}>
                             {ticket.priority}
                         </span>
                     </div>
                     <div className="text-sm font-medium text-white mb-1 truncate">{ticket.subject}</div>
                     <div className="text-xs text-zinc-500 flex justify-between">
                         <span>#{ticket.ticketId}</span>
                         <span>{ticket.status}</span>
                     </div>
                 </div>
             ))}
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-[#151518]">
             {activeTicket ? (
                 <>
                    {/* Header */}
                    <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-surface/50 backdrop-blur-md">
                        <div>
                             <h2 className="font-bold text-lg flex items-center gap-2">
                                 {activeTicket.subject} 
                                 <span className="text-xs font-normal text-zinc-500 font-mono">#{activeTicket.ticketId}</span>
                             </h2>
                             <p className="text-xs text-zinc-400">Created by {activeTicket.user.username}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="secondary" className="text-danger hover:bg-danger/10 hover:text-danger border-danger/20">
                                <Icons.Trash size={14} className="mr-2" /> Nuke & Lock
                            </Button>
                            <Button size="sm" variant="secondary">Move & Ping</Button>
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">Resolve</Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* System Start */}
                        <div className="flex justify-center">
                            <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-500">Ticket created today at 10:42 AM</div>
                        </div>
                        
                        {activeTicket.messages.map(msg => (
                            <div key={msg.id} className={cn("flex gap-4 max-w-[80%]", msg.author.isStaff && "ml-auto flex-row-reverse")}>
                                <div className="w-8 h-8 rounded-full bg-surface-hover flex-shrink-0 flex items-center justify-center text-xs font-bold">
                                    {msg.author.username.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-bold text-sm text-zinc-300">{msg.author.username}</span>
                                        <span className="text-[10px] text-zinc-600">Today at 10:45 AM</span>
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        msg.author.isStaff ? "bg-primary text-white rounded-tr-none" : "bg-surface border border-white/10 text-zinc-300 rounded-tl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-surface border-t border-white/5">
                        <div className="relative">
                            <div className="absolute left-3 top-3 flex gap-2">
                                <button className="p-1 text-zinc-400 hover:text-white transition-colors"><Icons.Image size={18} /></button>
                                <button className="p-1 text-zinc-400 hover:text-white transition-colors"><Icons.Paperclip size={18} /></button>
                            </div>
                            <textarea 
                                className="w-full bg-black/20 border border-white/10 rounded-xl pl-24 pr-4 py-3 min-h-[50px] max-h-[200px] text-sm focus:border-primary/50 outline-none resize-none"
                                placeholder={`Message #${activeTicket.ticketId}...`}
                            />
                            <div className="absolute right-3 bottom-3 text-[10px] text-zinc-600">Markdown supported</div>
                        </div>
                    </div>
                 </>
             ) : (
                 <div className="flex-1 flex items-center justify-center text-zinc-500">
                     Select a ticket to view conversation
                 </div>
             )}
        </Card>
    </div>
  );
}
