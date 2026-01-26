'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { EmbedEditor } from '../components/EmbedEditor';
import { EmbedData, ActionRow } from '../types';
import { ChannelPicker } from '@/components/ui/ChannelPicker';

interface BroadcastTowerProps {
  guildId: string;
}

export function BroadcastTower({ guildId }: BroadcastTowerProps) {
  const [targets, setTargets] = useState<{ type: 'channel' | 'role', id: string }[]>([]);
  const [currentTarget, setCurrentTarget] = useState('');
  const [targetType, setTargetType] = useState<'channel' | 'role'>('channel');
  
  const [data, setData] = useState<{ embed: EmbedData, components: ActionRow[] }>({
    embed: { title: '', description: '', color: '#5865f2', footer: '', thumbnail: '', image: '', fields: [] },
    components: []
  });

  const [schedule, setSchedule] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const addTarget = () => {
    if (!currentTarget) return;
    setTargets([...targets, { type: targetType, id: currentTarget }]);
    setCurrentTarget('');
  };

  const removeTarget = (index: number) => {
    setTargets(targets.filter((_, i) => i !== index));
  };

  const sendBroadcast = async () => {
    if (targets.length === 0) return setMessage('No targets selected');
    setSending(true);
    try {
       const res = await fetch('/api/bot/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guildId, targets, message: data, schedule })
       });
       if (res.ok) setMessage('Broadcast queued!');
       else setMessage('Failed to queue broadcast');
    } catch { setMessage('Error sending broadcast'); }
    setSending(false);
  };

  return (
    <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-3 gap-8 h-full"> 
       {/* Left: Configuration */}
       <div className="xl:col-span-1 flex flex-col gap-6">
          <Card className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <Icons.Radio className="text-primary" size={24} />
                  <div>
                      <h2 className="text-lg font-bold font-display">Targeting</h2>
                      <p className="text-xs text-zinc-400">Who receives this message?</p>
                  </div>
              </div>

              <div>
                  <Label>Destination</Label>
                  <div className="flex gap-2 mb-2">
                      <Button size="sm" variant={targetType==='channel'?'primary':'secondary'} onClick={()=>setTargetType('channel')} className="flex-1">Channels</Button>
                      <Button size="sm" variant={targetType==='role'?'primary':'secondary'} onClick={()=>setTargetType('role')} className="flex-1">Roles</Button>
                  </div>
                  <div className="flex gap-2">
                      {targetType === 'channel' ? (
                          <ChannelPicker 
                             guildId={guildId}
                             value={currentTarget}
                             onChange={setCurrentTarget}
                             placeholder="Select channel target"
                             className="flex-1"
                          />
                      ) : (
                          <Input 
                            value={currentTarget} 
                            onChange={e => setCurrentTarget(e.target.value)} 
                            placeholder="Role ID"
                            onKeyDown={e => e.key === 'Enter' && addTarget()}
                            className="flex-1"
                          />
                      )}
                      <Button onClick={addTarget}>Add</Button>
                  </div>
              </div>

              {targets.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {targets.map((t, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded bg-surface border border-white/5 text-sm">
                              <div className="flex items-center gap-2">
                                  {t.type === 'channel' ? <Icons.Hash size={14} className="text-zinc-400" /> : <Icons.Shield size={14} className="text-zinc-400" />}
                                  <span className="font-mono">{t.id}</span>
                              </div>
                              <button onClick={() => removeTarget(i)} className="text-danger hover:text-danger-hover">
                                  <Icons.X size={14} />
                              </button>
                          </div>
                      ))}
                  </div>
              )}
          </Card>

          <Card className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <Icons.Clock className="text-primary" size={24} />
                  <div>
                      <h2 className="text-lg font-bold font-display">Scheduling</h2>
                      <p className="text-xs text-zinc-400">When should this fly?</p>
                  </div>
              </div>

              <div>
                  <Label>Send Time</Label>
                  <Input 
                      type="datetime-local" 
                      value={schedule} 
                      onChange={e => setSchedule(e.target.value)} 
                      className="bg-surface"
                  />
                  <p className="text-xs text-zinc-500 mt-2">Leave blank to send immediately.</p>
              </div>

              <div className="pt-4 border-t border-white/5">
                  <Button onClick={sendBroadcast} disabled={sending} glow className="w-full text-lg h-12">
                      {sending ? 'Broadcasting...' : schedule ? 'Schedule Message' : 'Broadcast Now'}
                  </Button>
                  {message && <p className={`text-sm mt-3 text-center ${message.includes('queued') ? 'text-emerald-400' : 'text-danger'}`}>{message}</p>}
              </div>
          </Card>
      </div>

       {/* Right: Editor */}
       <div className="xl:col-span-2 flex flex-col h-full overflow-hidden">
           <div className="border border-white/5 rounded-2xl p-6 bg-black/20 flex-1 overflow-y-auto">
               <EmbedEditor value={data} onChange={setData} />
           </div>
       </div>
    </div>
  );
}
