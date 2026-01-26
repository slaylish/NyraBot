'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface EmbedData {
  title: string;
  description: string;
  color: string;
  footer: string;
  thumbnail: string;
  image: string;
  fields: { name: string; value: string; inline: boolean }[];
}

export default function MessagesPage() {
  const params = useParams();
  const guildId = params?.guildId as string;
  
  const [embed, setEmbed] = useState<EmbedData>({
    title: '',
    description: '',
    color: '#5865f2',
    footer: '',
    thumbnail: '',
    image: '',
    fields: [],
  });
  
  const [channel, setChannel] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const addField = () => {
    setEmbed({ ...embed, fields: [...embed.fields, { name: '', value: '', inline: false }] });
  };

  const updateField = (index: number, key: string, value: string | boolean) => {
    const fields = [...embed.fields];
    fields[index] = { ...fields[index], [key]: value };
    setEmbed({ ...embed, fields });
  };

  const removeField = (index: number) => {
    setEmbed({ ...embed, fields: embed.fields.filter((_, i) => i !== index) });
  };

  const sendEmbed = async () => {
    if (!channel) {
      setMessage('Please enter a channel ID');
      return;
    }
    
    setSending(true);
    try {
      const res = await fetch('/api/bot/send-embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guildId, channelId: channel, embed }),
      });
      
      if (res.ok) {
        setMessage('Embed sent successfully!');
      } else {
        const data = await res.json();
        setMessage(data.error || 'Failed to send embed');
      }
    } catch {
      setMessage('Failed to send embed');
    }
    setSending(false);
  };

  return (
    <div className="flex min-h-screen bg-background font-sans text-white">
      <DashboardSidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Embed Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor */}
          <Card className="space-y-6">
            <div>
              <Label>Title</Label>
              <Input 
                value={embed.title} 
                onChange={e => setEmbed({ ...embed, title: e.target.value })}
                placeholder="Embed title"
              />
            </div>

            <div>
              <Label>Description</Label>
              <textarea 
                className="w-full rounded-xl bg-background border border-border px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all min-h-[100px] resize-y"
                value={embed.description} 
                onChange={e => setEmbed({ ...embed, description: e.target.value })}
                placeholder="Describe your embed..."
              />
            </div>

            <div>
              <Label>Color</Label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color"
                  value={embed.color} 
                  onChange={e => setEmbed({ ...embed, color: e.target.value })}
                  className="w-12 h-10 rounded-lg cursor-pointer bg-background border border-border p-1"
                />
                <span className="text-sm text-zinc-400">{embed.color}</span>
              </div>
            </div>

            <div>
              <Label>Image URL</Label>
              <Input 
                value={embed.image} 
                onChange={e => setEmbed({ ...embed, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label>Footer</Label>
              <Input 
                value={embed.footer} 
                onChange={e => setEmbed({ ...embed, footer: e.target.value })}
                placeholder="Footer text"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="mb-0">Fields</Label>
                <Button size="sm" onClick={addField}>+ Add Field</Button>
              </div>
              
              <div className="space-y-3">
                {embed.fields.map((field, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background border border-border space-y-3">
                    <Input 
                      placeholder="Field Name"
                      value={field.name}
                      onChange={e => updateField(i, 'name', e.target.value)}
                    />
                    <Input 
                      placeholder="Field Value"
                      value={field.value}
                      onChange={e => updateField(i, 'value', e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs text-zinc-400">
                        <input 
                          type="checkbox" 
                          checked={field.inline} 
                          onChange={e => updateField(i, 'inline', e.target.checked)}
                          className="rounded border-border bg-background" 
                        />
                        Inline
                      </label>
                      <button onClick={() => removeField(i)} className="text-xs text-danger hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-[#313338] rounded-md p-4 border-l-4" style={{ borderColor: embed.color }}>
              {embed.title && <div className="text-base font-semibold text-white mb-2">{embed.title}</div>}
              {embed.description && <div className="text-sm text-zinc-300 mb-4 whitespace-pre-wrap">{embed.description}</div>}
              
              {embed.fields.length > 0 && (
                <div className="grid grid-cols-12 gap-2 mb-4">
                  {embed.fields.map((f, i) => (
                    <div key={i} className={f.inline ? 'col-span-4' : 'col-span-12'}>
                      <div className="text-sm font-semibold text-white">{f.name}</div>
                      <div className="text-sm text-zinc-300">{f.value}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {embed.image && (
                <img src={embed.image} alt="" className="rounded-md max-w-full mb-2" />
              )}
              
              {embed.footer && <div className="text-xs text-zinc-400">{embed.footer}</div>}
            </div>

            <Card>
              <Label>Channel ID</Label>
              <div className="flex gap-4">
                <Input 
                  value={channel} 
                  onChange={e => setChannel(e.target.value)} 
                  placeholder="Channel ID to send to"
                />
                <Button onClick={sendEmbed} disabled={sending} className="min-w-[120px]">
                  {sending ? 'Sending...' : 'Send'}
                </Button>
              </div>
              {message && (
                <p className={`text-sm mt-3 ${message.includes('success') ? 'text-emerald-400' : 'text-danger'}`}>
                  {message}
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
