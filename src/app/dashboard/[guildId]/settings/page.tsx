'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';

export default function SettingsPage() {
  const params = useParams();
  const guildId = params?.guildId as string;
  const [settings, setSettings] = useState({
    prefix: '!',
    language: 'en',
    timezone: 'UTC'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!guildId) return;
    fetch(`/api/guilds/${guildId}/settings`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSettings(data); })
      .catch(() => {});
  }, [guildId]);

  const saveSettings = async () => {
    setSaving(true);
    try {
      await fetch(`/api/guilds/${guildId}/settings`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(settings)
      });
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  return (
    <div className="flex-1 p-8">
        <PageHeader 
          title="Settings" 
          description="Core configuration for your server" 
        />

        <Card className="max-w-3xl space-y-8 p-10">
            <div className="flex items-center gap-2 pb-6 border-b border-white/5">
                <Icons.Settings className="text-primary" />
                <h2 className="font-bold text-lg">General Configuration</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label className="text-zinc-400 ml-1">Command Prefix</Label>
                    <Input 
                        value={settings.prefix}
                        onChange={e => setSettings({...settings, prefix: e.target.value})}
                        className="font-mono text-center text-lg tracking-widest"
                    />
                    <p className="text-xs text-zinc-600 ml-1">Default: !</p>
                </div>
                <div className="space-y-2">
                     <Label className="text-zinc-400 ml-1">Server Language</Label>
                     <div className="relative">
                        <select 
                            value={settings.language}
                            onChange={e => setSettings({...settings, language: e.target.value})}
                            className="w-full p-3 pl-4 rounded-xl bg-surface-hover/50 border border-white/10 text-sm focus:border-primary/50 outline-none appearance-none cursor-pointer hover:bg-surface-hover"
                        >
                            <option value="en">English (US)</option>
                            <option value="es">Español</option>
                        </select>
                        <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                     </div>
                </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-white/5">
                <Button onClick={saveSettings} disabled={saving} size="lg" glow>
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </Card>
    </div>
  );
}
