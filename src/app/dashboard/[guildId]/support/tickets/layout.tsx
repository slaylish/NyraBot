'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/ui/PageHeader';

const tabs = [
  { name: 'Panel Architect', href: 'panels', icon: Icons.Edit },
  { name: 'Routing Engine', href: 'routing', icon: Icons.TrendUp },
  { name: 'Omni-Inbox', href: 'inbox', icon: Icons.Message },
];

export default function TicketCenterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const guildId = params?.guildId as string;

  return (
    <div className="flex-1 flex flex-col h-full">
       <div className="px-8 pt-8">
            <PageHeader 
                title="Ticket Center" 
                description="Manage your help desk and support workflows" 
            />
            
            <div className="flex items-center gap-6 border-b border-white/5 mb-8">
                {tabs.map(tab => {
                   const isActive = pathname?.includes(tab.href);
                   return (
                      <Link 
                        key={tab.name} 
                        href={`/dashboard/${guildId}/support/tickets/${tab.href}`}
                        className={cn(
                           "flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-all",
                           isActive 
                             ? "border-primary text-white" 
                             : "border-transparent text-zinc-400 hover:text-zinc-200"
                        )}
                      >
                         <tab.icon size={16} />
                         {tab.name}
                      </Link>
                   );
                })}
            </div>
       </div>
       
       <div className="flex-1 px-8 pb-8 overflow-hidden flex flex-col">
          {children}
       </div>
    </div>
  );
}
