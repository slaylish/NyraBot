'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { EmbedData, ActionRow } from '../types';
import { EmbedEditor } from '../components/EmbedEditor';
import { ChannelPicker } from '@/components/ui/ChannelPicker';

interface EmbedBuilderProps {
  guildId: string;
}

export function EmbedBuilder({ guildId }: EmbedBuilderProps) {
  const [data, setData] = useState<{ embed: EmbedData, components: ActionRow[] }>({
    embed: { title: '', description: '', color: '#5865f2', footer: '', thumbnail: '', image: '', fields: [] },
    components: []
  });
  
  const [channel, setChannel] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmbed = async () => {
    if (!channel) return setMessage('Please enter a channel ID');
    setSending(true);
    try {
      const res = await fetch('/api/bot/send-embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guildId, channelId: channel, embed: data.embed, components: data.components }),
      });
      setMessage(res.ok ? 'Sent successfully!' : (await res.json()).error || 'Failed');
    } catch { setMessage('Failed to send'); }
    setSending(false);
  };

  return (
    <div className="flex-1 p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display">Embed Builder</h1>
        
        <div className="flex gap-4 items-center bg-surface p-2 rounded-xl">
             <ChannelPicker 
                guildId={guildId} 
                value={channel} 
                onChange={setChannel} 
                placeholder="Select channel..."
                className="w-56"
             />
             <Button onClick={sendEmbed} disabled={sending} glow size="sm">
                {sending ? 'Sending...' : 'Send to Channel'}
             </Button>
        </div>
      </div>
      {message && <p className={`text-sm mb-4 text-center ${message.includes('succ') ? 'text-emerald-400' : 'text-danger'}`}>{message}</p>}

      <EmbedEditor value={data} onChange={setData} />
    </div>
  );
}
