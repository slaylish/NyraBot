'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { EmbedEditor } from '@/modules/Messages/components/EmbedEditor';
import { ChannelPicker } from '@/components/ui/ChannelPicker';
import { EmbedData, ActionRow } from '@/modules/Messages/types';

interface PanelArchitectProps {
  guildId: string;
}

export function PanelArchitect({ guildId }: PanelArchitectProps) {
  // State for the panel configuration
  const [panelName, setPanelName] = useState('General Support');
  const [channelId, setChannelId] = useState('');
  
  // Embed & Components state (Shared with EmbedEditor)
  const [embedData, setEmbedData] = useState<{ embed: EmbedData, components: ActionRow[] }>({
      embed: {
          title: 'Open a Ticket',
          description: 'Click the button below to contact support.',
          color: '#5865f2',
          fields: [],
          footer: 'Powered by Nyra',
          image: '',
          thumbnail: ''
      },
      components: [
          { type: 'ActionRow', components: [{ type: 'Button', style: 'Primary', label: 'Create Ticket', customId: 'create_ticket' }] }
      ]
  });

  const [saving, setSaving] = useState(false);

  const savePanel = async () => {
      setSaving(true);
      // TODO: API Call to save panel
      await new Promise(r => setTimeout(r, 1000));
      setSaving(false);
  };

  return (
    <div className="flex h-full gap-8">
        {/* Configuration Sidebar */}
        <div className="w-80 flex-shrink-0 space-y-6 overflow-y-auto pr-2">
            <Card>
                <h3 className="font-bold mb-4">Panel Settings</h3>
                <div className="space-y-4">
                    <div>
                        <Label>Panel Name</Label>
                        <Input value={panelName} onChange={e => setPanelName(e.target.value)} placeholder="e.g. Support" />
                    </div>
                    <div>
                        <Label>Target Channel</Label>
                        <ChannelPicker 
                            guildId={guildId}
                            value={channelId}
                            onChange={setChannelId}
                            placeholder="Select channel..."
                        />
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold mb-4">Ticket Logic</h3>
                <div className="space-y-4">
                     <p className="text-xs text-zinc-400">
                         Configure what happens when a user opens a ticket.
                     </p>
                     
                     <div className="p-3 rounded-lg bg-surface border border-white/5 space-y-2">
                         <div className="text-sm font-semibold">Naming Scheme</div>
                         <Input defaultValue="ticket-{username}" className="h-8 text-xs font-mono" />
                     </div>

                     <div className="p-3 rounded-lg bg-surface border border-white/5 space-y-2">
                         <div className="text-sm font-semibold">Auto-Tagging</div>
                         <div className="flex flex-wrap gap-2">
                             <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs border border-primary/20">Support</span>
                             <button className="px-2 py-1 rounded bg-white/5 text-zinc-400 text-xs hover:bg-white/10">+ Add</button>
                         </div>
                     </div>
                </div>
            </Card>
            
            <Button onClick={savePanel} disabled={saving} glow className="w-full">
                {saving ? 'Saving...' : 'Deploy Panel'}
            </Button>
        </div>

        {/* Visual Editor */}
        <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 bg-surface/50">
                <h3 className="font-bold text-zinc-300">Visual Builder</h3>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
                <EmbedEditor 
                    value={embedData}
                    onChange={setEmbedData}
                />
            </div>
        </div>
    </div>
  );
}
