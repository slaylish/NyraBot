'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils'; // Assuming this utility exists

interface SuggestionKanbanProps {
  guildId: string;
}

const COLUMNS = [
  { id: 'new', title: 'New Suggestions', color: 'border-zinc-500' },
  { id: 'approved', title: 'Approved', color: 'border-blue-500' },
  { id: 'progress', title: 'In Progress', color: 'border-purple-500' },
  { id: 'implemented', title: 'Implemented', color: 'border-emerald-500' }
];

const CARDS = [
  { id: '1', content: 'Add a music bot channel', votes: 12, author: 'User1', status: 'new' },
  { id: '2', content: 'Make the welcome message funnier', votes: 45, author: 'User2', status: 'approved' },
  { id: '3', content: 'Fix the role assignment bug', votes: 99, author: 'User3', status: 'progress' },
];

export function SuggestionKanban({ guildId }: SuggestionKanbanProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
        <div className="px-8 pt-8">
            <PageHeader title="Roadmap" description="Turn community feedback into features" />
        </div>
        
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-8">
            <div className="flex h-full gap-6 min-w-max">
                {COLUMNS.map(col => (
                    <div key={col.id} className="w-80 flex flex-col h-full bg-[#151518] rounded-2xl border border-white/5">
                        <div className={cn("p-4 border-b-2 font-bold flex justify-between items-center bg-surface/50 rounded-t-2xl", col.color)}>
                            {col.title}
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-zinc-400">
                                {CARDS.filter(c => c.status === col.id).length}
                            </span>
                        </div>
                        
                        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                            {CARDS.filter(c => c.status === col.id).map(card => (
                                <div key={card.id} className="p-4 rounded-xl bg-surface border border-white/5 hover:border-white/20 cursor-grab active:cursor-grabbing shadow-lg transition-all group">
                                    <p className="text-sm font-medium mb-3 text-zinc-200">{card.content}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-[10px] text-white">
                                                {card.author.charAt(0)}
                                            </div>
                                            {card.author}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                                            <Icons.TrendUp size={12} /> {card.votes}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Empty State */}
                            {CARDS.filter(c => c.status === col.id).length === 0 && (
                                <div className="h-20 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-zinc-600 text-sm italic">
                                    No cards
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
