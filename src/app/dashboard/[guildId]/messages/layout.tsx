'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

const tabs = [
  { name: 'Builder', href: 'builder', icon: Icons.Edit },
  { name: 'Branding', href: 'branding', icon: Icons.Palette },
  { name: 'Responses', href: 'responses', icon: Icons.Message },
  { name: 'Broadcast', href: 'broadcast', icon: Icons.Radio },
];

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const guildId = params?.guildId as string;

  return (
    <div className="flex-1 flex flex-col">
       {/* Sub-navigation Removed as per Sidebar V2 */ }
       
       {children}
    </div>
  );
}
