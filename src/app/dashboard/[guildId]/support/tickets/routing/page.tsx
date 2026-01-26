'use client';

import { useParams } from 'next/navigation';
import { RoutingEngine } from '@/modules/Support/Tickets/RoutingEngine';

export default function RoutingPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <RoutingEngine guildId={guildId} />;
}
