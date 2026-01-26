'use client';

import { useParams } from 'next/navigation';
import { GatekeeperConfig } from '@/modules/Support/Appeals/GatekeeperConfig';

export default function GatekeeperPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <GatekeeperConfig guildId={guildId} />;
}
