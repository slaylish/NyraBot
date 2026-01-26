'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icons } from '@/components/icons';

// Mock data for support dashboard
const STATS = [
  { label: 'Open Tickets', value: 12, change: '+2', trend: 'up' },
  { label: 'Avg Response', value: '1h 4m', change: '-12m', trend: 'down' }, // down is good for response time
  { label: 'Feedback Score', value: '4.8', change: '+0.1', trend: 'up' },
];

const RECENT_TICKETS = [
  { id: 'T-1042', user: 'xQc_OW', subject: 'Appeal Ban', status: 'Open', time: '10m ago' },
  { id: 'T-1041', user: 'pokimane', subject: 'Report User', status: 'In Progress', time: '1h ago' },
  { id: 'T-1040', user: 'shroud', subject: 'General Question', status: 'Closed', time: '3h ago' },
];

export default function SupportDashboard() {
  return (
    <div className="flex-1 p-8 space-y-8">
      <PageHeader 
        title="Support Center" 
        description="Monitor ticket volume and team performance" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i} variant="elevated" className="relative overflow-hidden">
             <div className="flex justify-between items-start mb-2">
                <span className="text-zinc-400 font-medium text-sm">{stat.label}</span>
                <div className={`text-xs px-2 py-0.5 rounded-full ${stat.trend === 'up' && stat.label !== 'Avg Response' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-primary/10 text-primary'}`}>
                   {stat.change}
                </div>
             </div>
             <div className="text-3xl font-bold font-display">{stat.value}</div>
             {/* Decorative background icon */}
             <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                <Icons.Ticket size={80} />
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
              <Card className="h-80 flex flex-col items-center justify-center border-dashed bg-transparent">
                  <Icons.TrendUp size={48} className="text-zinc-700 mb-4" />
                  <p className="text-zinc-500 font-medium">Ticket Volume Analytics</p>
                  <p className="text-zinc-600 text-sm">Data visualization component placeholder</p>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/20">
                      <h3 className="font-bold mb-2">Team Efficiency</h3>
                      <p className="text-zinc-300 text-sm">Your team is resolving tickets <strong className="text-white">14% faster</strong> than last week.</p>
                  </Card>
                  <Card className="bg-gradient-to-br from-secondary/20 to-cyan-600/20 border-secondary/20">
                      <h3 className="font-bold mb-2">Customer Satisfaction</h3>
                      <p className="text-zinc-300 text-sm">Feedback score is <strong className="text-white">4.8/5.0</strong> based on 24 reviews.</p>
                  </Card>
              </div>
          </div>

          {/* Recent Activity */}
          <Card className="h-full">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Recent Activity</h3>
                  <button className="text-xs text-primary hover:text-primary-hover">View All</button>
              </div>
              <div className="space-y-4">
                  {RECENT_TICKETS.map(ticket => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center font-bold text-xs text-zinc-500 group-hover:text-white transition-colors">
                                  {ticket.user.charAt(0)}
                              </div>
                              <div>
                                  <div className="font-bold text-sm text-white group-hover:text-primary transition-colors">{ticket.subject}</div>
                                  <div className="text-xs text-zinc-500">{ticket.user} • {ticket.id}</div>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className={`text-xs font-bold ${ticket.status === 'Open' ? 'text-emerald-400' : ticket.status === 'Closed' ? 'text-zinc-500' : 'text-yellow-400'}`}>
                                  {ticket.status}
                              </div>
                              <div className="text-[10px] text-zinc-600">{ticket.time}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </Card>
      </div>
    </div>
  );
}
