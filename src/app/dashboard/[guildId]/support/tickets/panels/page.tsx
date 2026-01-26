'use client';

import { useParams } from 'next/navigation';
import { PanelArchitect } from '@/modules/Support/Tickets/PanelArchitect';

export default function PanelsPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <PanelArchitect guildId={guildId} />;
}
