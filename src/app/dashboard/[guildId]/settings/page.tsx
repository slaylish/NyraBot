'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

// Icons
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const BotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;

export default function SettingsPage() {
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [prefix, setPrefix] = useState('!');
  const [nickname, setNickname] = useState('Nyra');
  const [status, setStatus] = useState('Watching over {member_count} members');

  return (
    <div className="flex min-h-screen bg-background font-sans text-white">
      <DashboardSidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-zinc-400">Core configuration & permissions</p>
        </div>

        {/* Localization */}
        <Card className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <GlobeIcon />
            <h3 className="font-bold">Localization & Time</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label>Server Language</Label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-background border border-border text-sm focus:border-primary/50 outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div>
              <Label>Timezone</Label>
              <select 
                value={timezone} 
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-background border border-border text-sm focus:border-primary/50 outline-none"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern (US)</option>
                <option value="America/Los_Angeles">Pacific (US)</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
              </select>
            </div>
            <div>
              <Label>Legacy Prefix</Label>
              <Input 
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                maxLength={3}
              />
            </div>
          </div>
        </Card>

        {/* Bot Identity */}
        <Card className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BotIcon />
            <h3 className="font-bold">Bot Identity</h3>
          </div>
          <p className="text-sm text-zinc-500 mb-6">Customize how Nyra appears in your server</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Nickname</Label>
              <Input 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <Label>
                Activity Status 
                <span className="ml-2 px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">PRO</span>
              </Label>
              <Input 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Watching over {member_count} members"
              />
              <p className="text-xs text-zinc-600 mt-2">Variables: {'{member_count}'}, {'{server_name}'}</p>
            </div>
          </div>
        </Card>

        {/* Save */}
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Reset</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
