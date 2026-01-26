'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card } from '@/components/ui/Card';

const supportModules = [
  { name: 'Tickets', href: 'tickets', desc: 'Manage support tickets' },
  { name: 'Appeals', href: 'appeals', desc: 'Ban appeals handling' },
  { name: 'Reports', href: 'reports', desc: 'User reports' },
  { name: 'Suggestions', href: 'suggestions', desc: 'Community suggestions' },
  { name: 'Surveys', href: 'surveys', desc: 'Feedback forms' },
  { name: 'Settings', href: 'settings', desc: 'Support configuration' },
];

export default function SupportPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return (
    <div className="flex min-h-screen bg-background font-sans text-white">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Support & Tickets</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportModules.map(m => (
            <a key={m.name} href={`/dashboard/${guildId}/support/${m.href}`} className="block group">
              <Card className="h-full hover:border-primary/50 transition-colors">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{m.name}</h3>
                <p className="text-sm text-zinc-500">{m.desc}</p>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
