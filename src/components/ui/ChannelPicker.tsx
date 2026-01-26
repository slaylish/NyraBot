'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Channel {
  id: string;
  name: string;
  type: number; // 0 = Text, 2 = Voice, etc.
}

interface ChannelPickerProps {
  guildId: string;
  value: string;
  onChange: (channelId: string) => void;
  placeholder?: string;
  className?: string;
}

export function ChannelPicker({ guildId, value, onChange, placeholder = "Select channel...", className }: ChannelPickerProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stub data for now, would fetch from API
     fetch(`/api/guilds/${guildId}/channels`)
       .then(r => r.ok ? r.json() : [])
       .then(data => {
            setChannels(data);
            setLoading(false);
       })
       .catch(() => {
           setLoading(false);
           // Fallback stub if API fails or doesn't exist yet
           setChannels([
               { id: '123456789', name: 'general', type: 0 },
               { id: '987654321', name: 'announcements', type: 0 },
               { id: '456123789', name: 'moderation-logs', type: 0 },
           ]);
       });
  }, [guildId]);

  const selectedChannel = channels.find(c => c.id === value);

  return (
    <div className={cn("relative", className)}>
        <button 
           onClick={() => setIsOpen(!isOpen)}
           className="w-full h-11 flex items-center justify-between px-3.5 bg-background border border-border rounded-[14px] hover:border-white/10 transition-colors"
        >
            <div className="flex items-center gap-2 text-sm">
                {selectedChannel ? (
                    <>
                       <Icons.Hash size={16} className="text-zinc-400" />
                       <span className="font-semibold text-white">{selectedChannel.name}</span>
                    </>
                ) : (
                    <span className="text-zinc-500">{loading ? 'Loading channels...' : placeholder}</span>
                )}
            </div>
            <Icons.ChevronDown size={14} className={cn("text-zinc-500 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
            <div className="absolute top-full text-sm mt-2 left-0 w-full z-50 bg-[#1e1f22] border border-white/5 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                <div className="p-1.5 space-y-0.5">
                    {channels.length === 0 && !loading && <div className="p-3 text-center text-zinc-500 text-xs">No channels found</div>}
                     {channels.map(channel => (
                        <button
                            key={channel.id}
                            onClick={() => { onChange(channel.id); setIsOpen(false); }}
                            className={cn(
                                "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors group",
                                value === channel.id ? "bg-[#3f4147] text-white" : "text-zinc-400 hover:bg-[#35373c] hover:text-zinc-200"
                            )}
                        >
                            <Icons.Hash size={16} className={value===channel.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-400"} />
                            <span className="font-medium">{channel.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        )}
        
        {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
